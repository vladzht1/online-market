using Microsoft.AspNetCore.Mvc;
using LanguageExt.Common;

using MK.Dtos.Order;
using MK.Services;

namespace MK.Controllers;

[ApiController]
[Route("api/orders")]
public class OrderController(IOrderService orderService) : ControllerBase
{
    private readonly IOrderService _orderService = orderService;

    [HttpGet()]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _orderService.GetAll());
    }

    [HttpGet("{orderId}")]
    public async Task<IActionResult> GetOne(int orderId)
    {
        var result = await _orderService.GetById(orderId);
        return result.ToActionResult(order => order);
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] CreateOrderDto createOrderDto)
    {
        var result = await _orderService.Create(createOrderDto);
        return result.ToActionResult(order => order);
    }

    [HttpPatch("")]
    public async Task<IActionResult> Update([FromBody] UpdateOrderDto updateOrderDto)
    {
        var result = await _orderService.Update(updateOrderDto);
        return result.ToActionResult(order => order);
    }

    [HttpDelete("{orderId}")]
    public async Task<IActionResult> Delete(int orderId)
    {
        Result<bool> deleteResult = await _orderService.Delete(orderId);

        if (deleteResult.IsSuccess)
        {
            return NoContent();
        }

        return deleteResult.ToActionResult(order => order);
    }
}
