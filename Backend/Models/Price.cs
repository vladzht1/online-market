namespace MK.Models;

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

    public double Value { get; private set; }
    public string Currency { get; private set; } = string.Empty;
    public Product Product { get; private set; } = null!;
    public Market Market { get; private set; } = null!;
    public bool IsValid { get => InvalidatedAt == null; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? InvalidatedAt { get; private set; } = null;

    public bool Invalidate()
    {
        if (!IsValid)
        {
            return false;
        }

        return true;
    }
}
