using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

[Table(name: "orders")]
public class Order : BaseEntity
{
    public Order(Market market, Address address, User user)
    {
        Market = market;
        AddressForDelivery = address;
        User = user;
        Status = OrderStatus.CREATED;
        LastStatusUpdated = DateTime.UtcNow;
    }

    private Order()
    {
    }

    public List<OrderPosition> ProductPositions { get; set; } = [];
    public Market Market { get; private set; } = null!;
    public Address AddressForDelivery { get; private set; } = null!;
    public User User { get; private set; } = null!;
    public OrderStatus Status { get; private set; }

    [Column(name: "last_status_update_at")]
    public DateTime LastStatusUpdated { get; private set; }

    [Column(name: "delivered_at")]
    public DateTime? DeliveredAt { get; private set; } = null;

    public bool IsDelivered()
    {
        return DeliveredAt != null;
    }

    public bool SetStatus(OrderStatus status)
    {
        if (status == OrderStatus.CREATED)
        {
            return false;
        }

        Status = status;
        MarkStatusUpdated();

        return true;
    }

    public void MarkAsDelivered()
    {
        if (IsDelivered())
        {
            return;
        }

        Status = OrderStatus.DELIVERED;
        DeliveredAt = DateTime.UtcNow;

        MarkStatusUpdated();
    }

    private void MarkStatusUpdated()
    {
        LastStatusUpdated = DateTime.UtcNow;
    }
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

[Table(name: "order_positions")]
public class OrderPosition : BaseEntity
{
    public OrderPosition(Product product, Store store, Order order, Price price, int quantity)
    {
        Store = store;
        Product = product;
        Order = order;
        Price = price;
        Quantity = quantity;
    }

    private OrderPosition()
    {
    }

    public Store Store { get; private set; } = null!;
    public Product Product { get; private set; } = null!;
    public Order Order { get; private set; } = null!;

    [Column(name: "order_id")]
    public int OrderId { get; private set; }
    public Price Price { get; private set; } = null!;
    public int Quantity { get; private set; }
}
