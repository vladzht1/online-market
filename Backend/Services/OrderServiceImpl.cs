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

    public async Task<Result<Order>> GetById(int orderId)
    {
        var order = await _orderRepository.GetById(orderId);

        if (order == null)
        {
            return new Result<Order>(new ResourceNotFoundException("Заказ не найден"));
        }

        return order;
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

            orderedMarketProducts.Add(new MarketProductOrderPosition(marketProduct, marketProductPosition.quantity));

        }

        foreach (var a in orderedMarketProducts)
        {
            Console.WriteLine(a.product.Market.Name);
        }

        var positions = orderedMarketProducts.GroupBy(position => position.product.Market);

        Order? lastOrder = null;

        foreach (var position in positions)
        {
            if (position.ToList().Count == 0)
            {
                continue;
            }

            // FIXME: invalid market
            var order = new Order(position.ToList()[0].product.Market, user.DeliveryAddress, user);

            if (await _orderRepository.Save(order) == null)
            {
                return new Result<Order>(new OperationFailedException("Не удалось сохранить заказ"));
            }

            lastOrder = order;

            foreach (var productOfMarket in position)
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

    public Task<Result<Order>> Update(UpdateOrderDto updateOrderDto)
    {
        throw new NotImplementedException();
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

    // Temp entity, don't use anywhere
    private struct MarketProductOrderPosition(AvailableProduct product, int quantity)
    {
        public readonly AvailableProduct product = product;
        public readonly int quantity = quantity;
    }
}
