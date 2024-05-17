using System.ComponentModel.DataAnnotations.Schema;

using MK.Helpers.Validators;

namespace MK.Models;

[Table(name: "stores")]

public class Store : BaseEntity
{
    private List<OrderPosition> _products = [];

    public Store(string label, int capacity, Address address)
    {
        Label = label;
        Capacity = capacity;
        Address = address;
    }

    private Store()
    {
    }

    [Column("label")]
    public string Label { get; set; } = string.Empty;

    [Column("capacity")]
    public int Capacity { get; set; }
    public int Loaded { get => _products.Aggregate(0, (accumulator, product) => accumulator + product.Quantity); }

    public Address Address { get; set; } = null!;
    public IReadOnlyList<OrderPosition> Products { get => _products.AsReadOnly(); }

    public bool UpdateLabel(string updatedLabel)
    {
        if (!StringValidator.IsNonEmpty(updatedLabel))
        {
            throw new ArgumentException("Label must not be empty");
        }

        if (Label == updatedLabel)
        {
            return false;
        }

        Label = updatedLabel;
        return true;
    }

    public bool CanLoadProduct(int amount)
    {
        return GetFreeSpace() >= amount;
    }

    public int GetFreeSpace()
    {
        return Capacity - Loaded;
    }
}
