using MK.Models;

namespace MK.Repositories;

public interface IOrderRepository
{
    public Task<Order[]> GetAll();
    public Task<Order?> GetById(int orderId);
    public Task<Order[]> GetByMarketName(string marketName);
    public Task<OrderStatus[]> GetAllOrderStatuses();
    public Task<OrderStatus?> GetOrderStatusByKey(OrderStatusKey key);
    public Task<int?> Save(Order order);
    public Task<int?> SaveOrderPosition(OrderPosition orderPosition);
    public Task<bool> Update(Order order);
    public Task<bool> Delete(int orderId);
}
