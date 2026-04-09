using JesterTech.Server.Data;
using JesterTech.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace JesterTech.Server.Repositories
{
    public class AuthRepository: IAuthRepository
    {
        private readonly ApplicationDbContext _context;

        public AuthRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        public void CreateUser(Users user)
        {
            _context.Users.Add(user);
            Save();
        }

        public void DeleteUser(Users user)
        {
            if (user != null)
            {
                _context.Users.Remove(user);
                Save();
            }
        }

        public Users GetUserByEmail(string email)
        {
            return _context.Users
                .Include(u => u.Purchases)
                .Include(u => u.Reviews)
                .FirstOrDefault(u => u.Email == email);
        }

        public Users GetUserById(int id)
        {
            return _context.Users
                 .Include(u => u.Purchases)
                 .Include(u => u.Reviews)
                 .FirstOrDefault(u => u.Id == id);
        }
        public void UpdateUser(Users user)
        {
            _context.Users.Update(user);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

    }
}
