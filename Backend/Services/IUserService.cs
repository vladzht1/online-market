using LanguageExt.Common;

using MK.Dtos.Users;
using MK.Models;

namespace MK.Services;

public interface IUserService
{
    public Task<User[]> GetAll();
    public Task<User[]> GetUserWhereNameLengthGreaterThan(int minimalNameLength);
    public Task<Result<User>> GetUserById(int userId);
    public Task<Result<User>> Create(CreateUserDto createUserDto);
    public Task<Result<User>> Update(UpdateUserDto updateUserDto);
    public Task<Result<bool>> Delete(int userId);
}
