using Npgsql;
using Microsoft.EntityFrameworkCore;

using MK.Database;
using MK.Models;

namespace MK.Repositories;

public class StoreRepositoryImpl : IStoreRepository
{
    public async Task<Store[]> GetAll()
    {
        using var db = new ApplicationPostgresContext();
        return await db.Stores
            .Include(store => store.Address)
            .ToArrayAsync();
    }

    public async Task<Store[]> GetStoresByMarketName(string marketName)
    {
        using var db = new ApplicationPostgresContext();

        NpgsqlParameter param = new("name", "%" + marketName.ToLower() + "%");

        var data = await db.Stores.FromSqlRaw(
            "SELECT stores.id, stores.label, stores.\"AddressId\" FROM stores " +
            "JOIN available_products ON (stores.id = available_products.\"StoreId\") " +
            "WHERE available_products.\"StoreId\" = stores.id AND " +
            "available_products.\"MarketId\" IN " +
            "(SELECT id FROM markets WHERE LOWER(name) LIKE @name)", param
        )
            .Include(store => store.Address)
            .ToArrayAsync();

        return data;
    }

    public async Task<Store?> GetById(int storeId)
    {
        using var db = new ApplicationPostgresContext();
        return await db.Stores
            .Where(store => store.Id == storeId)
            .Include(store => store.Address)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(Store store)
    {
        using var db = new ApplicationPostgresContext();

        var result = await db.Stores.AddAsync(store);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<bool> Update(Store store)
    {
        using var db = new ApplicationPostgresContext();

        db.Entry(store).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int storeId)
    {
        Store? store = await GetById(storeId);

        if (store == null)
        {
            Console.WriteLine("Store not found");
            return false;
        }

        using var db = new ApplicationPostgresContext();

        int initialStoresCount = db.Stores.ToList().Count;

        if (store.Address != null)
        {
            var deletedAddressRows = db.Database.ExecuteSql($"DELETE FROM Addresses WHERE Id = {store.Address.Id}");

            if (deletedAddressRows == 0)
            {
                Console.WriteLine("Store address deletion failed");
                return false;
            }
        }

        // NOTE: the value returned from method is always `false`
        _ = await db.Database.ExecuteSqlAsync($"DELETE FROM Stores WHERE Id = {store.Id}");
        await db.SaveChangesAsync();

        int storesCountAfterDelete = db.Stores.ToList().Count;
        bool deleted = initialStoresCount - storesCountAfterDelete == 1;

        if (!deleted)
        {
            Console.WriteLine("Failed to delete store");
        }

        return deleted;
    }
}
