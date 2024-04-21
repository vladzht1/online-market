using LanguageExt.Common;

using Market.Dtos.Users;
using Market.Exceptions;
using Market.Models;
using Market.Repositories;

namespace Market.Services;

public class UserServiceImpl(IUserRepository userRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;

    public Task<User[]> GetAll()
    {
        return _userRepository.GetAll();
    }

    public async Task<Result<User>> GetUserById(int userId)
    {
        User? user = await _userRepository.GetUserById(userId);

        if (user == null)
        {
            return new Result<User>(new ResourceNotFoundException("Пользователя с таким ID не существует"));
        }

        return user;
    }

    public async Task<Result<User>> Create(CreateUserDto createUserDto)
    {
        var user = new User()
        {
            FirstName = createUserDto.firstName,
            MiddleName = createUserDto.middleName,
            LastName = createUserDto.lastName,
            Login = createUserDto.login,
            Email = createUserDto.email,
            Password = createUserDto.password,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        int? savedUserId = await _userRepository.Save(user);

        if (savedUserId == null)
        {
            return new Result<User>(new OperationFailedException("Не удалось создать пользователя"));
        }

        return (await _userRepository.GetUserById((int)savedUserId!))!;
    }

    public async Task<Result<User>> Update(UpdateUserDto updateUserDto)
    {
        User? userToUpdate = await _userRepository.GetUserById(updateUserDto.id);

        if (userToUpdate == null)
        {
            return new Result<User>(new ResourceNotFoundException("Такой пользователь не существует"));
        }

        userToUpdate.FirstName = updateUserDto.firstName ?? userToUpdate.FirstName;
        userToUpdate.MiddleName = updateUserDto.middleName ?? userToUpdate.MiddleName;
        userToUpdate.LastName = updateUserDto.lastName ?? userToUpdate.LastName;
        userToUpdate.Login = updateUserDto.login ?? userToUpdate.Login;
        userToUpdate.Email = updateUserDto.email ?? userToUpdate.Email;
        userToUpdate.Password = updateUserDto.password ?? userToUpdate.Password;
        userToUpdate.UpdatedAt = DateTime.UtcNow;

        bool updated = await _userRepository.Update(userToUpdate);

        if (!updated)
        {
            return new Result<User>(new OperationFailedException("Не удалось обновить данные пользователя"));
        }

        return userToUpdate;
    }

    public async Task<Result<bool>> Delete(int userId)
    {
        bool deleted = await _userRepository.Delete(userId);

        if (!deleted)
        {
            return new Result<bool>(new ResourceNotFoundException("Не удалось удалить пользователя"));
        }

        return true;
    }
}
