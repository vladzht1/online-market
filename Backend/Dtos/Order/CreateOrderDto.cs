namespace MK.Dtos.Order;

public class CreateOrderDto
{
    public int userId { get; set; }
    public List<CreateOrderProductPosition> products { get; set; } = null!;
}

public class CreateOrderProductPosition
{
    public int marketProductId { get; set; }
    public int quantity { get; set; }
}
