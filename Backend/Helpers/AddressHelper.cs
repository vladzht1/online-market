using MK.Dtos.Addresses;
using MK.Models;

namespace MK.Helpers.AddressHelpers;

public static class AddressHelpers
{
    public static void UpdateAddress(Address origin, UpdateAddressDto source)
    {
        origin.CountryCode = source.countryCode ?? origin.CountryCode;
        origin.Region      = source.region      ?? origin.Region;
        origin.City        = source.city        ?? origin.City;
        origin.Street      = source.street      ?? origin.Street;
        origin.Building    = source.building    ?? origin.Building;
        origin.Apartment   = source.apartment   ?? origin.Apartment;
        origin.ZipCode     = source.zipCode     ?? origin.ZipCode;
        origin.Comment     = source.comment     ?? origin.Comment;
    }
}
