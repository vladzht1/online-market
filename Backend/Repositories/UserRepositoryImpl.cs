using Microsoft.EntityFrameworkCore;

using Market.Database;
using Market.Models;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using LanguageExt.SomeHelp;

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
