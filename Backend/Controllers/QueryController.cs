using Microsoft.AspNetCore.Mvc;

using MK.Services;

namespace MK.Controllers;

[ApiController]
[Route("api/queries")]
public class QueryController(
    IUserService userService,
    IOrderService orderService,
    IStoreService storeService,
    IProductService productService
) : ControllerBase
{
    private readonly IUserService _userService = userService;
    private readonly IOrderService _orderService = orderService;
    private readonly IStoreService _storeService = storeService;
    private readonly IProductService _productService = productService;

    [HttpGet("one/{minimalNameLength}")]
    public async Task<IActionResult> GetQueryOneResult(int minimalNameLength)
    {
        return Ok(await _userService.GetUserWhereNameLengthGreaterThan(minimalNameLength));
    }

    [HttpGet("two/{marketName}")]
    public async Task<IActionResult> GetQueryTwoResult(string marketName)
    {
        return Ok(await _orderService.GetByMarketName(marketName));
    }

    [HttpGet("three/{marketName}")]
    public async Task<IActionResult> GetQueryThreeResult(string marketName)
    {
        return Ok(await _storeService.GetStoresByMarketName(marketName));
    }

    [HttpGet("four/{marketName}")]
    public async Task<IActionResult> GetQueryFourResult(string marketName)
    {
        return Ok(await _productService.GetProductsByMarketName(marketName));
    }

    [HttpGet("five/{storeName}")]
    public async Task<IActionResult> GetQueryFiveResult(string storeName)
    {
        return Ok(await _productService.GetProductsByStoreName(storeName));
    }
}
