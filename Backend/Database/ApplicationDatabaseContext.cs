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
    public DbSet<Product> Products { get; set; }
    public DbSet<AvailableProduct> AvailableProducts { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderPosition> OrderPositions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql($"Host=localhost;Port=5432;Database=online_market;Username=postgres;Password=postgres");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Market>(entity => {
            entity
                .HasOne(market => market.OfficeAddress)
                .WithOne()
                .HasForeignKey<Address>(address => address.MarketId);
        });

        modelBuilder.Entity<Product>(entity => {
            entity
                .HasMany(product => product.Properties)
                .WithOne(property => property.Product)
                .HasForeignKey(property => property.ProductId);

            entity
                .HasMany(product => product.Images)
                .WithOne(image => image.Product)
                .HasForeignKey(image => image.ProductId);
        });

        modelBuilder.Entity<Order>(entity => {
            entity
                .HasMany(order => order.ProductPositions)
                .WithOne(orderPosition => orderPosition.Order)
                .HasForeignKey(orderPosition => orderPosition.OrderId);
        });
    }
}
