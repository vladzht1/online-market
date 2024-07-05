using System.ComponentModel.DataAnnotations.Schema;

using MK.Helpers.Validators;

namespace MK.Models;

[Table(name: "markets")]
public class Market : BaseEntity
{
    public Market(string name, string description, string links, Address officeAddress)
    {
        Name = name;
        Description = description;
        Links = links;
        OfficeAddress = officeAddress;
    }

    private Market()
    {
    }

    [Column(name: "name")]
    public string Name { get; private set; } = string.Empty;

    [Column(name: "description")]
    public string Description { get; private set; } = string.Empty;

    [Column(name: "links")]
    public string Links { get; private set; } = null!;

    [Column(name: "office_address_id")]
    public Address OfficeAddress { get; set; } = null!;

    public void UpdateName(string updatedName)
    {
        if (!StringValidator.IsNonEmpty(updatedName))
        {
            throw new ArgumentException("Name must not be empty");
        }

        if (Name == updatedName)
        {
            return;
        }

        Name = updatedName;
    }

    public void UpdateDescription(string updatedDescription)
    {
        if (!StringValidator.IsNonEmpty(updatedDescription))
        {
            throw new ArgumentException("Description must not be empty");
        }

        if (Description == updatedDescription)
        {
            return;
        }

        Description = updatedDescription;
    }

    public void UpdateLinks(string updatedLinks)
    {
        Links = updatedLinks;
    }
}
