using Microsoft.EntityFrameworkCore;
using Npgsql;

using MK.Database;
using MK.Models;

namespace MK.Repositories;

public class UserRepositoryImpl : IUserRepository
{
    public async Task<User[]> GetAll()
    {
        using var db = new ApplicationPostgresContext();
        return await db.Users
            .Include(user => user.DeliveryAddress)
            .ToArrayAsync();
    }

    public async Task<User[]> GetUserWhereNameLengthGreaterThan(int minimalNameLength)
    {
        using var db = new ApplicationPostgresContext();

        NpgsqlParameter param = new("length", minimalNameLength);
        return await db.Users.FromSqlRaw("SELECT * FROM users WHERE LENGTH(first_name) > @length", param).ToArrayAsync();
    }

    public async Task<User?> GetUserById(int userId)
    {
        using var db = new ApplicationPostgresContext();
        return await db.Users
            .Include(user => user.DeliveryAddress)
            .Where(user => user.Id == userId)
            .FirstOrDefaultAsync();
    }

    public async Task<int?> Save(User user)
    {
        using var db = new ApplicationPostgresContext();

        var result = await db.Users.AddAsync(user);
        await db.SaveChangesAsync();

        return result.Entity.Id;
    }

    public async Task<bool> Update(User user)
    {
        using var db = new ApplicationPostgresContext();

        db.Entry(user).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> Delete(int userId)
    {
        using var db = new ApplicationPostgresContext();

        var deletedRows = db.Database.ExecuteSql($"DELETE FROM Users WHERE Id = {userId}");
        await db.SaveChangesAsync();

        return deletedRows > 0;
    }
}
