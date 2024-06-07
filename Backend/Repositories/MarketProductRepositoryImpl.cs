using Microsoft.EntityFrameworkCore;

using MK.Database;
using MK.Dtos.Products;
using MK.Models;

namespace MK.Repositories;

public class MarketProductRepositoryImpl : IMarketProductRepository
{
    public async Task<AvailableProduct[]> GetAll(MarketProductSearchQueryDto marketProductSearchQueryDto)
    {
        using var db = new ApplicationPostgresContext();

        var result = db.AvailableProducts;

        if (marketProductSearchQueryDto.Id != null)
        {
            result.Where(p => p.Id == marketProductSearchQueryDto.Id);
        }

        if (marketProductSearchQueryDto.ProductId != null)
        {
            result.Where(p => p.Product.Id == marketProductSearchQueryDto.ProductId);
        }

        if (marketProductSearchQueryDto.MarketId != null)
        {
            result.Where(p => p.Market.Id == marketProductSearchQueryDto.MarketId);
        }

        if (marketProductSearchQueryDto.StoreId != null)
        {
            result.Where(p => p.Store.Id == marketProductSearchQueryDto.StoreId);
        }

        return await result
            .Include(product => product.Market)
            .Include(product => product.Product)
            .Include(product => product.Price)
            .Include(product => product.Store)
            .ToArrayAsync();
    }

    public async Task<AvailableProduct?> GetById(int marketProductId)
    {
        using var db = new ApplicationPostgresContext();
        return await db.AvailableProducts
            .Where(product => product.Id == marketProductId)
            .Include(product => product.Market)
            .Include(product => product.Product)
            .Include(product => product.Price)
            .Include(product => product.Store)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(AvailableProduct marketProduct)
    {
        using var db = new ApplicationPostgresContext();

        db.ChangeTracker.Context.Attach(marketProduct.Market);
        db.ChangeTracker.Context.Attach(marketProduct.Product);
        db.ChangeTracker.Context.Attach(marketProduct.Store);

        var result = await db.AvailableProducts.AddAsync(marketProduct);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public Task<bool> Update(AvailableProduct marketProduct)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Delete(int marketProductId)
    {
        AvailableProduct? marketProduct = await GetById(marketProductId);

        if (marketProduct == null)
        {
            Console.WriteLine("Product in market was not found");
            return false;
        }

        using var db = new ApplicationPostgresContext();

        db.Entry(marketProduct).State = EntityState.Deleted;
        await db.SaveChangesAsync();

        return true;
    }
}
