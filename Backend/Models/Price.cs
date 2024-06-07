using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

[Table(name: "prices")]
public class Price : BaseEntity
{
    public static Price CreateFromBaseWithNewPrice(Price price, double newPriceValue)
    {
        return new Price(newPriceValue, price.Currency, price.Product, price.Market);
    }

    public Price(double value, string currency, Product product, Market market)
    {
        Value = value;
        Currency = currency;
        Product = product;
        Market = market;
        CreatedAt = DateTime.UtcNow;
        InvalidatedAt = null;
    }

    private Price()
    {
    }

    public Product Product { get; private set; } = null!;
    public Market Market { get; private set; } = null!;

    [Column(name: "value")]
    public double Value { get; private set; }

    [Column(name: "currency")]
    public string Currency { get; private set; } = string.Empty;

    [Column(name: "is_valid")]
    public bool IsValid { get => InvalidatedAt == null; }

    [Column(name: "created_at")]
    public DateTime CreatedAt { get; private set; }

    [Column(name: "invalidated_at")]
    public DateTime? InvalidatedAt { get; private set; } = null;

    public bool Invalidate()
    {
        if (!IsValid)
        {
            return false;
        }

        InvalidatedAt = DateTime.UtcNow;
        return true;
    }
}
