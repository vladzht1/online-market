namespace MK.Models;

public class Order : BaseEntity
{
    public Store Store { get; set; } = null!;
    public Market Market { get; set; } = null!;
    public Address AddressForDelivery { get; set; } = null!;
    public User User { get; set; } = null!;
    public OrderStatus Status { get; set; } = OrderStatus.CREATED;
    public DateTime LastStatusUpdated { get; set; }
    public DateTime? DeliveredAt { get; set; } = null;
}

public enum OrderStatus
{
    CREATED,
    PACKING,
    IN_DELIVERY,
    DELIVERED,
    CANCELLED_BY_USER,
    CANCELLED_BY_SELLER
}

public class OrderPosition : BaseEntity
{
    public Product Product { get; set; } = null!;
    public Order Order { get; set; } = null!;
    public Price Price { get; set; } = null!;
    public int Quantity { get; set; }
}
