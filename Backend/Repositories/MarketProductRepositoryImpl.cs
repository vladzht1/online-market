using LanguageExt;
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

        var result = db.AvailableProducts
            .Where(p => marketProductSearchQueryDto.Id == null || p.Id == marketProductSearchQueryDto.Id)
            .Where(p => marketProductSearchQueryDto.ProductId == null || p.Product.Id == marketProductSearchQueryDto.ProductId)
            .Where(p => marketProductSearchQueryDto.MarketId == null || p.Market.Id == marketProductSearchQueryDto.MarketId)
            .Where(p => marketProductSearchQueryDto.StoreId == null || p.Store.Id == marketProductSearchQueryDto.StoreId)
            .Where(p => p.Quantity > 0)
            .OrderBy(product => product.Id)
            .Include(product => product.Market)
            .Include(product => product.Product)
            .Include(product => product.Price)
            .Include(product => product.Store);

        return await result.ToArrayAsync();
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

        db.Entry(marketProduct.Market).State = EntityState.Unchanged;
        db.Entry(marketProduct.Product).State = EntityState.Unchanged;
        db.Entry(marketProduct.Store).State = EntityState.Unchanged;

        var result = await db.AvailableProducts.AddAsync(marketProduct);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<bool> Update(AvailableProduct marketProduct)
    {
        using var db = new ApplicationPostgresContext();

        db.Entry(marketProduct.Market).State = EntityState.Detached;
        db.Entry(marketProduct.Product).State = EntityState.Detached;
        db.Entry(marketProduct.Store).State = EntityState.Detached;

        db.Entry(marketProduct).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return true;
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
