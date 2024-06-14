using Microsoft.EntityFrameworkCore;
using Npgsql;

using MK.Database;
using MK.Models;

namespace MK.Repositories;

public class ProductRepositoryImpl : IProductRepository
{
    public async Task<Product[]> GetAll()
    {
        using var db = new ApplicationPostgresContext();
        return await db.Products
            .Include(product => product.Images)
            .Include(product => product.Properties)
            .ToArrayAsync();
    }

    // Выбрать все товары, купленные из магазина
    public async Task<Product[]> GetProductsByMarketName(string marketName)
    {
        using var db = new ApplicationPostgresContext();

        NpgsqlParameter param = new("name", "%" + marketName.ToLower() + "%");

        var data = await db.Products.FromSqlRaw(
            "SELECT products.id, products.name, products.description FROM products " +
            "JOIN order_positions ON (products.id = order_positions.\"ProductId\") " +
            "JOIN orders ON (order_positions.order_id = orders.id) " +
            "WHERE orders.\"MarketId\" IN " +
            "(SELECT id FROM markets WHERE LOWER(name) LIKE @name)", param
        )
            .Include(product => product.Images)
            .Include(product => product.Properties)
            .ToArrayAsync();

        return data;
    }

    // Выбрать все такие товары, которые лежат на складе с названием
    public async Task<Product[]> GetProductsByStoreName(string storeName)
    {
        using var db = new ApplicationPostgresContext();

        NpgsqlParameter param = new("label", "%" + storeName.ToLower() + "%");

        var data = await db.Products.FromSqlRaw(
            "SELECT * FROM products " +
            "WHERE EXISTS (SELECT * FROM available_products " +
            "WHERE products.id = available_products.\"ProductId\" AND \"StoreId\" IN " +
            "(SELECT id FROM stores WHERE LOWER(label) LIKE @label))", param
        )
            .Include(product => product.Images)
            .Include(product => product.Properties)
            .ToArrayAsync();

        return data;
    }

    public async Task<Product?> GetById(int productId)
    {
        using var db = new ApplicationPostgresContext();
        return await db.Products
            .Where(products => products.Id == productId)
            .Include(product => product.Images)
            .Include(product => product.Properties)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(Product product)
    {
        using var db = new ApplicationPostgresContext();

        var result = await db.Products.AddAsync(product);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<bool> Update(Product product)
    {
        using var db = new ApplicationPostgresContext();

        var productFromDb = await GetById(product.Id);

        if (productFromDb == null)
        {
            return false;
        }

        foreach (var prop in productFromDb.Properties)
        {
            db.Entry(prop).State = EntityState.Deleted;
        }

        foreach (var image in productFromDb.Images)
        {
            db.Entry(image).State = EntityState.Deleted;
        }

        foreach (var prop in product.Properties)
        {
            db.Entry(prop).State = EntityState.Added;
        }

        foreach (var image in product.Images)
        {
            db.Entry(image).State = EntityState.Added;
        }

        db.Entry(product).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int productId)
    {
        Product? product = await GetById(productId);

        if (product == null)
        {
            Console.WriteLine("Product not found");
            return false;
        }

        using var db = new ApplicationPostgresContext();

        db.Entry(product).State = EntityState.Deleted;
        await db.SaveChangesAsync();

        return true;
    }
}
