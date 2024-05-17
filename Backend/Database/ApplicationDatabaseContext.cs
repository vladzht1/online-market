using Microsoft.EntityFrameworkCore;

using MK.Models;

namespace MK.Database;

public class ApplicationPostgresContext : DbContext
{
    public ApplicationPostgresContext()
    {
        Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Market> Markets { get; set; }
    public DbSet<Store> Stores { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql($"Host=localhost;Port=5432;Database=online_market;Username=postgres;Password=postgres");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Market>()
            .HasOne(market => market.OfficeAddress)
            .WithOne()
            .HasForeignKey<Address>(address => address.MarketId);
    }
}
