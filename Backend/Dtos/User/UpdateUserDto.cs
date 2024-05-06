namespace MK.Dtos.Users;

public class UpdateUserDto
{
    public int id { get; set; }
    public string? firstName { get; set; }
    public string? middleName { get; set; }
    public string? lastName { get; set; }
    public string? email { get; set; }
    public string? login { get; set; }
    public string? password { get; set; }
}
