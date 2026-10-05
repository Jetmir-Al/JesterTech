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

        public async Task CreateUser(Users user)
        {
            await _context.Users.AddAsync(user);
            await Save();
        }

        public async Task DeleteUser(Users user)
        {
            if (user != null)
            {
                _context.Users.Remove(user);
                await Save();
            }
        }

        public async Task<Users> GetUserByEmail(string email)
        {
            return await _context.Users
                .Include(u => u.Purchases)
                .Include(u => u.Reviews)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Users> GetUserById(int id)
        {
            return await _context.Users
                 .Include(u => u.Purchases)
                 .Include(u => u.Reviews)
                 .FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task UpdateUser(Users user)
        {
            _context.Users.Update(user);
            await Save();
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }

    }
}
