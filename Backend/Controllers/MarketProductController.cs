using Microsoft.AspNetCore.Mvc;
using LanguageExt.Common;

using MK.Dtos.Products;
using MK.Services;

namespace MK.Controllers;

[ApiController]
[Route("api/market_products")]
public class MarketProductController(IMarketProductService marketProductService) : ControllerBase
{
    private readonly IMarketProductService _marketProductService = marketProductService;

    [HttpGet()]
    public async Task<IActionResult> GetAll([FromQuery] MarketProductSearchQueryDto marketProductSearchQueryDto)
    {
        return Ok(await _marketProductService.GetAll(marketProductSearchQueryDto));
    }

    [HttpGet("{productInMarketId}")]
    public async Task<IActionResult> GetOne(int productInMarketId)
    {
        var result = await _marketProductService.GetById(productInMarketId);
        return result.ToActionResult(product => product);
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] AddProductToMarketDto createMarketProductDto)
    {
        var result = await _marketProductService.Create(createMarketProductDto);
        return result.ToActionResult(product => product);
    }

    [HttpPatch("")]
    public async Task<IActionResult> Update([FromBody] UpdateMarketProductDto updateProductDto)
    {
        var result = await _marketProductService.Update(updateProductDto);
        return result.ToActionResult(product => product);
    }

    [HttpDelete("{productInMarketId}")]
    public async Task<IActionResult> Delete(int productInMarketId)
    {
        Result<bool> deleteResult = await _marketProductService.Delete(productInMarketId);

        if (deleteResult.IsSuccess)
        {
            return NoContent();
        }

        return deleteResult.ToActionResult(product => product);
    }
}
