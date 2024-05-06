using MK.Dtos.Addresses;

namespace MK.Dtos.Markets;

public class CreateMarketDto
{
    public string name { get; set; } = null!;
    public string description { get; set; } = null!;
    public string[] links { get; set; } = null!;
    public CreateAddressDto address { get; set; } = null!;
}
