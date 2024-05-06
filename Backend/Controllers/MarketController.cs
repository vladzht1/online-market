using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;

using MK.Dtos.Markets;
using MK.Services;

namespace MK.Controllers;

[ApiController]
[Route("api/markets")]
public class MarketController(IMarketService marketService) : ControllerBase
{
    private readonly IMarketService _marketService = marketService;

    [HttpGet()]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _marketService.GetAll());
    }

    [HttpGet("{marketId}")]
    public async Task<IActionResult> GetOne(int marketId)
    {
        var result = await _marketService.GetMarketById(marketId);
        return result.ToActionResult(market => market);
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] CreateMarketDto createMarketDto)
    {
        var result = await _marketService.Create(createMarketDto);
        return result.ToActionResult(market => market);
    }

    [HttpPatch("")]
    public async Task<IActionResult> Update([FromBody] UpdateMarketDto updateMarketDto)
    {
        var result = await _marketService.Update(updateMarketDto);
        return result.ToActionResult(market => market);
    }

    [HttpDelete("{marketId}")]
    public async Task<IActionResult> Delete(int marketId)
    {
        Result<bool> marketDeleteResult = await _marketService.Delete(marketId);

        if (marketDeleteResult.IsSuccess)
        {
            return NoContent();
        }

        return marketDeleteResult.ToActionResult(market => market);
    }
}
