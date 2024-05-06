using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

[Table(name: "addresses")]
public class Address : BaseEntity
{
    [Column("country_code")]
    public string CountryCode { get; set; } = string.Empty;

    [Column("region")]
    public string Region { get; set; } = string.Empty;

    [Column("city")]
    public string City { get; set; } = string.Empty;

    [Column("street")]
    public string Street { get; set; } = string.Empty;

    [Column("building")]
    public string Building { get; set; } = string.Empty;

    [Column("apartment")]
    public string Apartment { get; set; } = string.Empty;

    // TODO: rename to `zip_code`
    [Column("address_index")]
    public string AddressIndex { get; set; } = string.Empty;

    [Column("comment")]
    public string Comment { get; set; } = string.Empty;

    [Column("market_id")]
    public int? MarketId { get; set; }
}
