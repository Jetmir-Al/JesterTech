using JesterTech.Server.Data;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JesterTech.Server.Repositories.Repository
{
    public class AuthRepository: IAuthRepository
    {
        private readonly ApplicationDbContext _context;

        public AuthRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task CreateUser(Users user, CancellationToken cancellationToken)
        {
            await _context.Users.AddAsync(user, cancellationToken);
            await SaveAsync(cancellationToken);
        }

        public async Task DeleteUser(int UserId, CancellationToken cancellationToken)
        {
                await _context.Users
                    .Where(data => data.Id == UserId)
                    .ExecuteDeleteAsync(cancellationToken);
                await SaveAsync(cancellationToken);
        }

        public async Task<Users> GetUserByEmail(string email, CancellationToken cancellationToken)
        {
            return await _context.Users
                .Include(u => u.Purchases)
                .Include(u => u.Reviews)
                .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
        }

        public async Task<Users> GetUserById(int id, CancellationToken cancellationToken)
        {
            return await _context.Users
                 .Include(u => u.Purchases)
                 .Include(u => u.Reviews)
                 .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        }
        public async Task UpdateUser(Users user, CancellationToken cancellationToken)
        {
            _context.Users.Update(user);
            await SaveAsync(cancellationToken);
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

    }
}
