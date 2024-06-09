using MK.Models;

namespace MK.Dtos.Order;

public class UpdateOrderDto
{
    public int orderId { get; set; }
    public OrderStatus? orderStatus { get; set; }
}
