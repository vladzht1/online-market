using System.ComponentModel.DataAnnotations.Schema;

using MK.Helpers.Validators;

namespace MK.Models;

[Table(name: "stores")]

public class Store : BaseEntity
{
    public Store(string label, Address address)
    {
        Label = label;
        Address = address;
    }

    private Store()
    {
    }

    [Column("label")]
    public string Label { get; set; } = string.Empty;

    [Column(name: "address_id")]
    public Address Address { get; set; } = null!;

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
}
