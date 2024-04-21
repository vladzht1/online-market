using System.ComponentModel.DataAnnotations.Schema;

namespace Market.Models;

public class BaseEntity
{
    [Column("id")]
    public int Id { get; set; }
}
