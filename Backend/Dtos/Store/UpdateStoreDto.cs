using MK.Dtos.Addresses;

namespace MK.Dtos.Stores;

public class UpdateStoreDto
{
    public int Id { get; set; }
    public string? Label { get; set; }
    public UpdateAddressDto? Address { get; set; }
}
