using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

[Table(name: "markets")]
public class Market : BaseEntity
{
    [Column(name: "name", TypeName = "varchar(127)")]
    public string Name { get; set; } = string.Empty;

    [Column(name: "description", TypeName = "varchar(255)")]
    public string Description { get; set; } = string.Empty;

    [Column(name: "links")]
    public string[] Links { get; set; } = [];
    public Address OfficeAddress { get; set; } = null!;
}
