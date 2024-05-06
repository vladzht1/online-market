using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

public class BaseEntity
{
    [Column("id")]
    public int Id { get; set; }
}
