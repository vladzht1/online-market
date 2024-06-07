namespace MK.Dtos.Products;

public class AddProductToMarketDto
{
    public int StoreId { get; set; }
    public int MarketId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public PriceDto Price { get; set; } = null!;
}

public class PriceDto
{
    public double Value { get; set; }
    public string Currency { get; set; } = null!;
}
