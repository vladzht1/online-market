using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;

using MK.Dtos.Stores;
using MK.Services;

namespace MK.Controllers;

[ApiController]
[Route("api/stores")]
public class StoreController(IStoreService storeService) : ControllerBase
{
    private readonly IStoreService _storeService = storeService;

    [HttpGet()]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _storeService.GetAll());
    }

    [HttpGet("{storeId}")]
    public async Task<IActionResult> GetOne(int storeId)
    {
        var result = await _storeService.GetById(storeId);
        return result.ToActionResult(store => store);
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] CreateStoreDto createStoreDto)
    {
        var result = await _storeService.Create(createStoreDto);
        return result.ToActionResult(store => store);
    }

    [HttpPatch("")]
    public async Task<IActionResult> Update([FromBody] UpdateStoreDto updateStoreDto)
    {
        var result = await _storeService.Update(updateStoreDto);
        return result.ToActionResult(store => store);
    }

    [HttpDelete("{storeId}")]
    public async Task<IActionResult> Delete(int storeId)
    {
        Result<bool> deleteResult = await _storeService.Delete(storeId);

        if (deleteResult.IsSuccess)
        {
            return NoContent();
        }

        return deleteResult.ToActionResult(store => store);
    }
}
