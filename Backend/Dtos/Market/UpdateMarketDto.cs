using MK.Dtos.Addresses;

namespace MK.Dtos.Markets;

public class UpdateMarketDto
{
    public int id { get; set; }
    public string? name { get; set; }
    public string? description { get; set; }
    public string? links { get; set; }
    public UpdateAddressDto? address { get; set; }
}
