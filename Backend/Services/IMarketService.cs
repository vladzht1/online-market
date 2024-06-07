using LanguageExt.Common;

using MK.Dtos.Markets;
using MK.Models;

namespace MK.Services;

public interface IMarketService
{
    public Task<Market[]> GetAll();
    public Task<Result<MarketDto>> GetById(int marketId);
    public Task<Result<Market>> Create(CreateMarketDto createMarketDto);
    public Task<Result<Market>> Update(UpdateMarketDto updateMarketDto);
    public Task<Result<bool>> Delete(int marketId);
}
