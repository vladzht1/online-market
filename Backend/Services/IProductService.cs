using LanguageExt.Common;

using MK.Dtos.Products;
using MK.Models;

namespace MK.Services;

public interface IProductService
{
    public Task<Product[]> GetAll();
    public Task<Product[]> GetProductsByMarketName(string marketName);
    public Task<Product[]> GetProductsByStoreName(string storeName);
    public Task<Result<Product>> GetById(int productId);
    public Task<Result<Product>> Create(CreateProductDto createProductDto);
    public Task<Result<Product>> Update(UpdateProductDto updateProductDto);
    public Task<Result<bool>> Delete(int productId);
}
