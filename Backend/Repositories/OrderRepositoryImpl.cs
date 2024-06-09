using Microsoft.EntityFrameworkCore;

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
            .Include(order => order.AddressForDelivery)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Product)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Store)
            .Include(order => order.ProductPositions)
                .ThenInclude(orderPosition => orderPosition.Price)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(Order order)
    {
        using var db = new ApplicationPostgresContext();

        db.ChangeTracker.Context.Attach(order.User);
        db.ChangeTracker.Context.Attach(order.AddressForDelivery);
        db.ChangeTracker.Context.Attach(order.Market);
        db.ChangeTracker.Context.Attach(order.User);

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

        db.Entry(order).State = EntityState.Deleted;
        await db.SaveChangesAsync();

        return true;
    }
}
