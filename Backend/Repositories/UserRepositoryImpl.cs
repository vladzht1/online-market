using Microsoft.EntityFrameworkCore;

using Market.Database;
using Market.Models;

namespace Market.Repositories;

public class UserRepositoryImpl : IUserRepository
{
    public async Task<User[]> GetAll()
    {
        using var db = new ApplicationPostgresContext();
        return [.. (await db.Users.ToArrayAsync())];
    }

    public async Task<User?> GetUserById(int userId)
    {
        using var db = new ApplicationPostgresContext();

        var user = await db.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();

        if (user == null)
        {
            return null;
        }

        return user;
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

        var result = db.Users.Update(user);
        await db.SaveChangesAsync();

        return result.State == EntityState.Modified;
    }

    public async Task<bool> Delete(int userId)
    {
        using var db = new ApplicationPostgresContext();

        var user = db.Users.Where(user => user.Id == userId).FirstOrDefault();

        if (user == null)
        {
            return false;
        }

        var result = db.Users.Remove(user);
        await db.SaveChangesAsync();

        return result.State != EntityState.Unchanged;
    }
}
