using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

[Table(name: "orders")]
public class Order : BaseEntity
{
    public Order(Market market, Address address, User user, OrderStatus status)
    {
        Market = market;
        AddressForDelivery = address;
        User = user;
        Status = status;
        LastStatusUpdated = DateTime.UtcNow;
    }

    private Order()
    {
    }

    public List<OrderPosition> ProductPositions { get; set; } = [];
    public Market Market { get; private set; } = null!;
    public Address AddressForDelivery { get; private set; } = null!;
    public User User { get; private set; } = null!;
    public OrderStatus Status { get; private set; } = null!;

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
        if (status.Key == OrderStatusKey.CREATED)
        {
            return false;
        }

        Status = status;
        MarkStatusUpdated();

        return true;
    }

    public void MarkAsDelivered(OrderStatus deliveredStatus)
    {
        if (IsDelivered())
        {
            return;
        }

        Status = deliveredStatus;
        DeliveredAt = DateTime.UtcNow;

        MarkStatusUpdated();
    }

    private void MarkStatusUpdated()
    {
        LastStatusUpdated = DateTime.UtcNow;
    }
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

[Table(name: "order_statuses")]
public class OrderStatus(string label, string labelRus, OrderStatusKey key) : BaseEntity
{
    [Column(name: "label")]
    public string Label { get; private set; } = label;

    [Column(name: "label_rus")]
    public string LabelRus { get; private set; } = labelRus;

    [Column(name: "key")]
    public OrderStatusKey Key { get; private set; } = key;
}

public enum OrderStatusKey
{
    CREATED,
    PACKING,
    IN_DELIVERY,
    DELIVERED,
    CANCELLED_BY_USER,
    CANCELLED_BY_SELLER
}
