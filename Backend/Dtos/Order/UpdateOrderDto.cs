using MK.Models;

namespace MK.Dtos.Order;

public class UpdateOrderDto
{
    public int id { get; set; }
    public OrderStatus? status { get; set; }
}
