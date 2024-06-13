using MK.Models;

namespace MK.Mappers;

public class OrderStatusMapper
{
    public static OrderStatusKey FromInt(int value)
    {
        return value switch
        {
            0 => OrderStatusKey.CREATED,
            1 => OrderStatusKey.PACKING,
            2 => OrderStatusKey.IN_DELIVERY,
            3 => OrderStatusKey.DELIVERED,
            4 => OrderStatusKey.CANCELLED_BY_USER,
            5 => OrderStatusKey.CANCELLED_BY_SELLER,
            _ => OrderStatusKey.CREATED,
        };
    }
}
