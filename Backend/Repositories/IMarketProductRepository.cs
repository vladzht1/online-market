using MK.Dtos.Products;
using MK.Models;

namespace MK.Repositories;

public interface IMarketProductRepository
{
    public Task<AvailableProduct[]> GetAll(MarketProductSearchQueryDto marketProductSearchQueryDto);
    public Task<AvailableProduct?> GetById(int marketProductId);
    public Task<int?> Save(AvailableProduct marketProduct);
    public Task<bool> Update(AvailableProduct marketProduct);
    public Task<bool> Delete(int marketProductId);
}
