using LanguageExt.Common;

using MK.Dtos.Order;
using MK.Models;

namespace MK.Services;

public interface IOrderService
{
    public Task<Order[]> GetAll();
    public Task<Result<Order>> GetById(int orderId);
    public Task<Result<Order>> Create(CreateOrderDto createOrderDto);
    public Task<Result<Order>> Update(UpdateOrderDto updateOrderDto);
    public Task<Result<bool>> Delete(int orderId);
}
