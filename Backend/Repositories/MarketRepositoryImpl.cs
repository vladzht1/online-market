using Microsoft.EntityFrameworkCore;

using MK.Database;
using MK.Models;
using MK.Repositories;

public class MarketRepositoryImpl : IMarketRepository
{
    public async Task<Market[]> GetAll()
    {
        using var db = new ApplicationPostgresContext();
        return await db.Markets.Include(market => market.OfficeAddress).ToArrayAsync();
    }

    public async Task<Market?> GetMarketById(int marketId)
    {
        using var db = new ApplicationPostgresContext();
        return await db.Markets
            .Where(market => market.Id == marketId)
            .Include(market => market.OfficeAddress)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(Market market)
    {
        using var db = new ApplicationPostgresContext();

        var result = await db.Markets.AddAsync(market);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<bool> Update(Market market)
    {
        using var db = new ApplicationPostgresContext();

        db.Entry(market).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int marketId)
    {
        Market? market = await GetMarketById(marketId);

        if (market == null)
        {
            return false;
        }

        using var db = new ApplicationPostgresContext();

        if (market.OfficeAddress != null)
        {
            var deletedAddressRows = db.Database.ExecuteSql($"DELETE FROM Addresses WHERE Id = {market.OfficeAddress.Id}");

            if (deletedAddressRows == 0)
            {
                Console.WriteLine("Market address deletion failed");
                return false;
            }
        }

        var deletedMarketRows = db.Database.ExecuteSql($"DELETE FROM Markets WHERE Id = {market.Id}");
        await db.SaveChangesAsync();

        return deletedMarketRows > 0;
    }
}
