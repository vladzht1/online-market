using Market.Models;

namespace Market.Repositories;

public interface IUserRepository
{
    public Task<User[]> GetAll();
    public Task<User?> GetUserById(int userId);
    public Task<int?> Save(User user);
    public Task<bool> Update(User user);
    public Task<bool> Delete(int userId);
}
