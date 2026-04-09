using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IAuthRepository
    {
        Users GetUserById(int id); 
        Users GetUserByEmail(string email);
        void CreateUser(Users user);
        void UpdateUser(Users user);
        void DeleteUser(Users user);

        void Save();
    }
}
