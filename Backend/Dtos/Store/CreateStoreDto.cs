using MK.Dtos.Addresses;

namespace MK.Dtos.Stores;

public class CreateStoreDto
{
    public string Label { get; set; } = null!;
    public CreateAddressDto Address { get; set; } = null!;
}
