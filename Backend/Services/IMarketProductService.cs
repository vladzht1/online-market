using LanguageExt.Common;

using MK.Dtos.Products;
using MK.Models;

namespace MK.Services;

public interface IMarketProductService
{
    public Task<AvailableProduct[]> GetAll(MarketProductSearchQueryDto marketProductSearchQueryDto);
    public Task<Result<AvailableProduct>> GetById(int marketProductId);
    public Task<Result<AvailableProduct>> Create(AddProductToMarketDto createMarketProductDto);
    public Task<Result<AvailableProduct>> Update(UpdateMarketProductDto updateMarketProductDto);
    public Task<Result<bool>> Delete(int marketProductId);
}
