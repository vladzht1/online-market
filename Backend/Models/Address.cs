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

    [Column("zip_code")]
    public string ZipCode { get; set; } = string.Empty;

    [Column("comment")]
    public string Comment { get; set; } = string.Empty;
}
