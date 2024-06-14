using MK.Models;

namespace MK.Repositories;

public interface IProductRepository
{
    public Task<Product[]> GetAll();
    public Task<Product[]> GetProductsByMarketName(string marketName);
    public Task<Product[]> GetProductsByStoreName(string storeName);
    public Task<Product?> GetById(int productId);
    public Task<int?> Save(Product product);
    public Task<bool> Update(Product product);
    public Task<bool> Delete(int productId);
}
