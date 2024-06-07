namespace MK.Dtos.Products;

public class UpdateMarketProductDto
{
    public int Id { get; set; }
    public int StoreId { get; set; }
    public int MarketId { get; set; }
    public int ProductId { get; set; }
    public int? Quantity { get; set; }
    public PriceDto Price { get; set; } = null!;
}
