using Microsoft.EntityFrameworkCore;

using Market.Models;

namespace Market.Database;

public class ApplicationPostgresContext : DbContext
{
    public ApplicationPostgresContext()
    {
        Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql($"Host=localhost;Port=5432;Database=online_market;Username=postgres;Password=postgres");
    }
}
