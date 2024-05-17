using MK.Dtos.Addresses;

namespace MK.Dtos.Stores;

public class CreateStoreDto
{
    public string Label { get; set; } = null!;
    public int Capacity { get; set; }
    public CreateAddressDto Address { get; set; } = null!;
}
