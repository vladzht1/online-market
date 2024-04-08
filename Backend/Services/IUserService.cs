using LanguageExt.Common;

using Market.Dtos.Users;
using Market.Models;

namespace Market.Services;

public interface IUserService
{
    public Task<User[]> GetAll();
    public Task<Result<User>> GetUserById(int userId);
    public Task<Result<User>> Create(CreateUserDto createUserDto);
    public Task<Result<User>> Update(UpdateUserDto updateUserDto);
    public Task<Result<bool>> Delete(int userId);
}
