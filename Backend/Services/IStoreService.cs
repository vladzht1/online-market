using LanguageExt.Common;

using MK.Dtos.Stores;
using MK.Models;

namespace MK.Services;

public interface IStoreService
{
    public Task<Store[]> GetAll();
    public Task<Store[]> GetStoresByMarketName(string marketName);
    public Task<Result<Store>> GetById(int storeId);
    public Task<Result<Store>> Create(CreateStoreDto createStoreDto);
    public Task<Result<Store>> Update(UpdateStoreDto updateStoreDto);
    public Task<Result<bool>> Delete(int storeId);
}
