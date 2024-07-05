namespace MK.Dtos.Addresses;

public class CreateAddressDto
{
    public string countryCode { get; set; } = string.Empty;
    public string region { get; set; } = string.Empty;
    public string city { get; set; } = string.Empty;
    public string street { get; set; } = string.Empty;
    public string building { get; set; } = string.Empty;
    public string apartment { get; set; } = string.Empty;
    public string zipCode { get; set; } = string.Empty;
    public string comment { get; set; } = string.Empty;
}
