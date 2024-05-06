namespace MK.Models;

public class Product : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string[] Images { get; set; } = [];
    public ProductProperty[] Properties { get; set; } = [];
}

public class ProductProperty : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public Product Product { get; set; } = null!;
}

public class AvailableProduct : BaseEntity
{
    public Store Store { get; set; } = null!;
    public Market Market { get; set; } = null!;
    public Price Price { get; set; } = null!;
    public Product Product { get; set; } = null!;
    public int Quantity { get; set; }
}
