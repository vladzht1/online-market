namespace Market.Models;

public class Market : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Links { get; set; } = [];
    public Address? OfficeAddress { get; set; }
}
