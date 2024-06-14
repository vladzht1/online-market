using MK.Models;

namespace MK.Repositories;

public interface IStoreRepository
{
    public Task<Store[]> GetAll();
    public Task<Store[]> GetStoresByMarketName(string marketName);
    public Task<Store?> GetById(int storeId);
    public Task<int?> Save(Store store);
    public Task<bool> Update(Store store);
    public Task<bool> Delete(int storeId);
}
