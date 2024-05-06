namespace MK.Dtos.Addresses;

public class UpdateAddressDto
{
    public int id { get; set; }
    public string? countryCode { get; set; }
    public string? region { get; set; }
    public string? city { get; set; }
    public string? street { get; set; }
    public string? building { get; set; }
    public string? apartment { get; set; }
    public string? addressIndex { get; set; }
    public string? comment { get; set; }
}
