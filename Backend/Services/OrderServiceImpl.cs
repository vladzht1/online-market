using LanguageExt.Common;

using MK.Dtos.Order;
using MK.Exceptions;
using MK.Models;
using MK.Repositories;

namespace MK.Services;

public class OrderServiceImpl(
    IOrderRepository orderRepository,
    IUserRepository userRepository,
    IMarketProductRepository marketProductRepository
) : IOrderService
{
    private readonly IOrderRepository _orderRepository = orderRepository;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IMarketProductRepository _marketProductRepository = marketProductRepository;

    public async Task<Order[]> GetAll()
    {
        return await _orderRepository.GetAll();
    }

    public async Task<Order[]> GetByMarketName(string marketName)
    {
        return await _orderRepository.GetByMarketName(marketName);
    }

    public async Task<OrderStatus[]> GetAllOrderStatuses()
    {
        return await _orderRepository.GetAllOrderStatuses();
    }

    public async Task<Result<Order>> GetById(int orderId)
    {
        var order = await _orderRepository.GetById(orderId);

        if (order == null)
        {
            return new Result<Order>(new ResourceNotFoundException("Заказ не найден"));
        }

        return order;
    }

    public async Task<Result<OrderStatus>> GetOrderStatusByKey(OrderStatusKey key)
    {
        var orderStatus = await _orderRepository.GetOrderStatusByKey(key);

        if (orderStatus == null)
        {
            return new Result<OrderStatus>(new ResourceNotFoundException("Статус заказа не найден"));
        }

        return orderStatus;
    }

    public async Task<Result<Order>> Create(CreateOrderDto createOrderDto)
    {
        User? user = await _userRepository.GetUserById(createOrderDto.userId);

        if (user == null)
        {
            return new Result<Order>(new ResourceNotFoundException("Пользователь не найден"));
        }

        List<MarketProductOrderPosition> orderedMarketProducts = [];

        foreach (var marketProductPosition in createOrderDto.products)
        {
            AvailableProduct? marketProduct = await _marketProductRepository.GetById(marketProductPosition.marketProductId);

            if (marketProduct == null)
            {
                Console.WriteLine($"Market product with id {marketProductPosition.marketProductId} was not found, skipping...");
                continue;
            }

            int deltaQuantity = Math.Min(marketProductPosition.quantity, marketProduct.Quantity);
            bool success = marketProduct.DecreaseQuantity(deltaQuantity);

            if (success == false || await _marketProductRepository.Update(marketProduct) == false)
            {
                continue;
            }

            orderedMarketProducts.Add(new MarketProductOrderPosition(marketProduct, marketProductPosition.quantity));
        }

        OrderStatus? createdOrderStatus = await _orderRepository.GetOrderStatusByKey(OrderStatusKey.CREATED);

        if (createdOrderStatus == null)
        {
            return new Result<Order>(new OperationFailedException("Не удалось получить статус заказа"));
        }

        Dictionary<Market, List<MarketProductOrderPosition>> positions = GroupPositionsByMarket(orderedMarketProducts);

        Order? lastOrder = null;

        foreach (var position in positions)
        {
            if (position.Value.Count == 0)
            {
                continue;
            }

            var order = new Order(position.Key, user.DeliveryAddress, user, createdOrderStatus);
            lastOrder = order;

            if (await _orderRepository.Save(order) == null)
            {
                return new Result<Order>(new OperationFailedException("Не удалось сохранить заказ"));
            }

            foreach (var productOfMarket in position.Value)
            {
                var orderPosition = new OrderPosition(
                    productOfMarket.product.Product,
                    productOfMarket.product.Store,
                    order,
                    productOfMarket.product.Price,
                    productOfMarket.quantity
                );

                order.ProductPositions.Add(orderPosition);
                await _orderRepository.SaveOrderPosition(orderPosition);
            }
        }

        if (lastOrder == null)
        {
            return new Result<Order>(new OperationFailedException("Не удалось создать заказ"));
        }

        return lastOrder;
    }

    public async Task<Result<Order>> Update(UpdateOrderDto updateOrderDto)
    {
        Order? order = await _orderRepository.GetById(updateOrderDto.id);

        if (order == null)
        {
            return new Result<Order>(new ResourceNotFoundException("Заказ не найден"));
        }

        if (updateOrderDto.status != null)
        {
            if (updateOrderDto.status.Key == OrderStatusKey.DELIVERED)
            {
                order.MarkAsDelivered(updateOrderDto.status);
            }
            else
            {
                order.SetStatus(updateOrderDto.status);
            }
        }

        if (await _orderRepository.Update(order) == false) {
            return new Result<Order>(new OperationFailedException("Не удалось обновить заказ"));
        }

        return order;
    }

    public async Task<Result<bool>> Delete(int orderId)
    {
        bool deleted = await _orderRepository.Delete(orderId);

        if (!deleted)
        {
            return new Result<bool>(new OperationFailedException("Не удалось удалить заказ"));
        }

        return true;
    }

    private Dictionary<Market, List<MarketProductOrderPosition>> GroupPositionsByMarket(List<MarketProductOrderPosition> positions)
    {
        Dictionary<Market, List<MarketProductOrderPosition>> result = [];

        foreach (var position in positions)
        {
            if (result.TryGetValue(position.product.Market, out List<MarketProductOrderPosition>? value))
            {
                value.Add(position);
            }
            else
            {
                result.TryAdd(position.product.Market, [position]);
            }
        }

        return result;
    }

    // Temp entity, don't use anywhere
    private struct MarketProductOrderPosition(AvailableProduct product, int quantity)
    {
        public readonly AvailableProduct product = product;
        public readonly int quantity = quantity;
    }
}
