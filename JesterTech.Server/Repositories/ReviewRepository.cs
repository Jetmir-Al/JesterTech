using JesterTech.Server.Data;
using JesterTech.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace JesterTech.Server.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;

        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateReview(Reviews review)
        {
            _context.Reviews.Add(review);
            await SaveAsync();
        }

        public async Task DeleteReview(Reviews review)
        {
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await SaveAsync();
            }
        }

        public async Task<List<Reviews>> GetReviewsByProductId(int productId)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.ProductId == productId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
