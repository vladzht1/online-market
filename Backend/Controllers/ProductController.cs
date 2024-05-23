using Microsoft.AspNetCore.Mvc;
using LanguageExt.Common;

using MK.Dtos.Products;
using MK.Services;

namespace MK.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController(IProductService productService) : ControllerBase
{
    private readonly IProductService _productService = productService;

    [HttpGet()]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _productService.GetAll());
    }

    [HttpGet("{productId}")]
    public async Task<IActionResult> GetOne(int productId)
    {
        var result = await _productService.GetById(productId);
        return result.ToActionResult(product => product);
    }

    [HttpPost("")]
    public async Task<IActionResult> Create([FromBody] CreateProductDto createProductDto)
    {
        var result = await _productService.Create(createProductDto);
        return result.ToActionResult(product => product);
    }

    [HttpPatch("")]
    public async Task<IActionResult> Update([FromBody] UpdateProductDto updateProductDto)
    {
        var result = await _productService.Update(updateProductDto);
        return result.ToActionResult(product => product);
    }

    [HttpDelete("{productId}")]
    public async Task<IActionResult> Delete(int productId)
    {
        Result<bool> deleteResult = await _productService.Delete(productId);

        if (deleteResult.IsSuccess)
        {
            return NoContent();
        }

        return deleteResult.ToActionResult(product => product);
    }
}
