using MK.Models;

namespace MK.Repositories;

public interface IAddressRepository
{
    // public Task<Address[]> GetAll();
    // public Task<Address?> GetAddressById(int addressId);
    // public Task<int?> Save(Address address);
    public Task<bool> Update(Address address);
    // public Task<bool> Delete(int marketId);
}
