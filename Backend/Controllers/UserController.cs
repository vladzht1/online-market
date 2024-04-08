using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;

using Market.Models;
using Market.Dtos.Users;
using Market.Services;

namespace Market.Controllers;

[ApiController]
[Route("api/users")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpGet()]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _userService.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        Result<User> userResult = await _userService.GetUserById(id);
        return userResult.ToActionResult(user => user);
    }

    [HttpPost()]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
    {
        Result<User> userCreateResult = await _userService.Create(createUserDto);
        return userCreateResult.ToActionResult(user => user);
    }

    [HttpPatch()]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
    {
        Result<User> userUpdateResult = await _userService.Update(updateUserDto);
        return userUpdateResult.ToActionResult(user => user);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        Result<bool> userDeleteResult = await _userService.Delete(id);

        if (userDeleteResult.IsSuccess)
        {
            return NoContent();
        }

        return userDeleteResult.ToActionResult(user => user);
    }
}
