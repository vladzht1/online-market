using System.ComponentModel.DataAnnotations.Schema;

namespace MK.Models;

[Table(name: "users")]
public class User : BaseEntity
{
    [Column("first_name")]
    public string FirstName { get; set; } = string.Empty;

    [Column("middle_name")]
    public string MiddleName { get; set; } = string.Empty;

    [Column("last_name")]
    public string LastName { get; set; } = string.Empty;

    [Column("login")]
    public string Login { get; set; } = string.Empty;

    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Column("password")]
    public string Password { get; set; } = string.Empty;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }
}
