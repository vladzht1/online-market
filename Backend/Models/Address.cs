namespace Market.Models;

public class Address : BaseEntity
{
    public string CountryCode { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string Building { get; set; } = string.Empty;
    public string Apartment { get; set; } = string.Empty;
    public string AddressIndex { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
}
