using Microsoft.EntityFrameworkCore;
using Npgsql;

using MK.Database;
using MK.Models;

namespace MK.Repositories;

public class OrderRepositoryImpl : IOrderRepository
{
    public async Task<Order[]> GetAll()
    {
        using var db = new ApplicationPostgresContext();
        return await db.Orders
            .Include(order => order.User)
            .Include(order => order.Market)
            .Include(order => order.Status)
            .Include(order => order.AddressForDelivery)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Product)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Store)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Price)
            .ToArrayAsync();
    }

    public async Task<Order?> GetById(int orderId)
    {
        using var db = new ApplicationPostgresContext();
        return await db.Orders
            .Where(order => order.Id == orderId)
            .Include(order => order.User)
            .Include(order => order.Market)
            .Include(order => order.Status)
            .Include(order => order.AddressForDelivery)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Product)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Store)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Price)
            .FirstOrDefaultAsync();
    }

    // Выбрать все заказы, сделанные за последние 2 дня из магазина
    public async Task<Order[]> GetByMarketName(string marketName)
    {
        using var db = new ApplicationPostgresContext();

        NpgsqlParameter param = new("name", "%" + marketName.ToLower() + "%");

        return await db.Orders.FromSqlRaw(
            "SELECT * FROM orders " +
            "WHERE AGE(created_at, now()) < '2 days' AND \"MarketId\" IN " +
            "(SELECT id FROM markets WHERE LOWER(name) LIKE @name)", param
        )
            .Include(order => order.User)
            .Include(order => order.Market)
            .Include(order => order.Status)
            .Include(order => order.AddressForDelivery)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Product)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Store)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Price)
            .ToArrayAsync();
    }

    public async Task<OrderStatus[]> GetAllOrderStatuses()
    {
        using var db = new ApplicationPostgresContext();
        return await db.OrderStatuses.ToArrayAsync();
    }

    public async Task<OrderStatus?> GetOrderStatusByKey(OrderStatusKey key)
    {
        using var db = new ApplicationPostgresContext();
        return await db.OrderStatuses
            .Where(status => status.Key == key)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(Order order)
    {
        using var db = new ApplicationPostgresContext();

        db.ChangeTracker.Context.Attach(order.User);
        db.ChangeTracker.Context.Attach(order.AddressForDelivery);
        db.ChangeTracker.Context.Attach(order.Market);
        db.ChangeTracker.Context.Attach(order.User);
        db.ChangeTracker.Context.Attach(order.Status);

        var result = await db.Orders.AddAsync(order);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<int?> SaveOrderPosition(OrderPosition orderPosition)
    {
        using var db = new ApplicationPostgresContext();

        db.ChangeTracker.Context.Attach(orderPosition.Store);
        db.ChangeTracker.Context.Attach(orderPosition.Price);
        db.ChangeTracker.Context.Attach(orderPosition.Product);
        db.ChangeTracker.Context.Attach(orderPosition.Order);

        var result = await db.OrderPositions.AddAsync(orderPosition);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<bool> Update(Order order)
    {
        using var db = new ApplicationPostgresContext();

        var orderFromDb = await GetById(order.Id);

        if (orderFromDb == null)
        {
            return false;
        }

        db.Entry(order.Status).State = EntityState.Unchanged;
        db.Entry(order).State = EntityState.Modified;

        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int orderId)
    {
        Order? order = await GetById(orderId);

        if (order == null)
        {
            Console.WriteLine("Order not found");
            return false;
        }

        using var db = new ApplicationPostgresContext();

        // Avoid status deletion when order is deleted
        db.Entry(order.Status).State = EntityState.Detached;
        db.Entry(order).State = EntityState.Deleted;

        await db.SaveChangesAsync();

        return true;
    }
}
