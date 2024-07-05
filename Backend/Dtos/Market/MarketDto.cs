using MK.Models;

namespace MK.Dtos.Markets;

public class MarketDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Links { get; set; } = null!;
    public Address OfficeAddress { get; set; } = null!;
    public List<AvailableProduct> Products { get; set; } = [];
}
