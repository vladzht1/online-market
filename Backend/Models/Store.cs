namespace MK.Models;

public class Store : BaseEntity
{
    public string Label { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public int Loaded { get; set; }
    public Address Address { get; set; } = null!;
}
