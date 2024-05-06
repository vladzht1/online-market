namespace MK.Models;

public class Price : BaseEntity
{
    public double Value { get; set; }
    public string Currency { get; set; } = string.Empty;
    public Product Product { get; set; } = null!;
    public User Creator { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
}
