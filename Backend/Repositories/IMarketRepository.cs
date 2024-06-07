using MK.Models;

namespace MK.Repositories;

public interface IMarketRepository
{
    public Task<Market[]> GetAll();
    public Task<Market?> GetById(int marketId);
    public Task<int?> Save(Market market);
    public Task<bool> Update(Market market);
    public Task<bool> Delete(int marketId);
}
