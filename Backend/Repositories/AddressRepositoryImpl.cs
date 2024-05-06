using Microsoft.EntityFrameworkCore;

using MK.Database;
using MK.Models;
using MK.Repositories;

public class AddressRepositoryImpl : IAddressRepository
{
    public async Task<bool> Update(Address address)
    {
        using var db = new ApplicationPostgresContext();

        db.Entry(address).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return true;
    }
}
