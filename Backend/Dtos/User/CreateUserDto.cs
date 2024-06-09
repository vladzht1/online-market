using MK.Dtos.Addresses;

namespace MK.Dtos.Users;

public class CreateUserDto
{
    public string firstName { get; set; } = null!;
    public string middleName { get; set; } = null!;
    public string lastName { get; set; } = null!;
    public string email { get; set; } = null!;
    public string login { get; set; } = null!;
    public string password { get; set; } = null!;
    public CreateAddressDto address { get; set; } = null!;
}
