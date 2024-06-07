using System.ComponentModel.DataAnnotations.Schema;

using MK.Dtos.Products;
using MK.Helpers.Validators;

namespace MK.Models;

[Table(name: "products")]
public class Product : BaseEntity
{
    public Product(string name, string description)
    {
        Name = name;
        Description = description;
    }

    [Column(name: "name")]
    public string Name { get; private set; } = string.Empty;

    [Column(name: "description")]
    public string Description { get; private set; } = string.Empty;

    public List<ProductImage> Images { get; private set; } = [];
    public List<ProductProperty> Properties { get; private set; } = [];

    public bool UpdateName(string value)
    {
        if (Name == value || !StringValidator.IsNonEmpty(value))
        {
            return false;
        }

        Name = value;
        return true;
    }

    public bool UpdateDescription(string value)
    {
        if (Name == value || !StringValidator.IsNonEmpty(value))
        {
            return false;
        }

        Description = value;
        return true;
    }

    public void AddImages(string[] imageUrls, bool append = true)
    {
        ClearImagesList(!append);

        foreach (var url in imageUrls)
        {
            Images.Add(new ProductImage(url, this));
        }
    }

    public void AddImages(ProductImage[] images, bool append = true)
    {
        ClearImagesList(!append);

        foreach (var image in images)
        {
            Images.Add(image);
        }
    }

    public void AddProperties(CreateProductPropertyDto[] properties)
    {
        Properties.Clear();

        foreach (var property in properties)
        {
            Properties.Add(new ProductProperty(property.name, property.value, this));
        }
    }

    private void ClearImagesList(bool shouldClear)
    {
        if (shouldClear)
        {
            Images.Clear();
        }
    }
}

[Table(name: "product_images")]
public class ProductImage : BaseEntity
{
    public ProductImage(string url, Product product)
    {
        Url = url;
        Product = product;
    }

    private ProductImage()
    {
    }

    [Column(name: "url")]
    public string Url { get; private set; } = string.Empty;

    public Product Product { get; private set; } = null!;

    [Column(name: "product_id")]
    public int ProductId { get; private set; }
}

[Table(name: "product_properties")]
public class ProductProperty : BaseEntity
{
    public ProductProperty(string name, string value, Product product)
    {
        Name = name;
        Value = value;
        Product = product;
    }

    private ProductProperty()
    {
    }

    [Column(name: "name")]
    public string Name { get; private set; } = string.Empty;

    [Column(name: "value")]
    public string Value { get; private set; } = string.Empty;

    public Product Product { get; private set; } = null!;

    [Column(name: "product_id")]
    public int ProductId { get; private set; }
}

[Table(name: "available_products")]
public class AvailableProduct : BaseEntity
{
    public AvailableProduct(Store store, Market market, Price price, Product product, int quantity)
    {
        Store = store;
        Market = market;
        Price = price;
        Product = product;
        Quantity = quantity;
    }

    private AvailableProduct()
    {
    }

    public Store Store { get; private set; } = null!;
    public Market Market { get; private set; } = null!;
    public Price Price { get; private set; } = null!;
    public Product Product { get; private set; } = null!;

    [Column(name: "quantity")]
    public int Quantity { get; private set; }
}
