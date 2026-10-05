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

        public async Task CreateReview(Reviews review, CancellationToken cancellationToken)
        {
            await _context.Reviews.AddAsync(review, cancellationToken);
            await SaveAsync(cancellationToken);
        }

        public async Task DeleteReview(Reviews review, CancellationToken cancellationToken)
        {
            if (review != null)
            {
                _context.Reviews.Remove(review);
                await SaveAsync(cancellationToken);
            }
        }

        public async Task<(List<Reviews>, int TotalCount)> GetReviewsByProductId(int productId, CancellationToken cancellationToken)
        {
            var reviews = await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.ProductId == productId)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            var totalCount = await _context.Reviews
                .Where(r => r.ProductId == productId)
                .CountAsync(cancellationToken);

            return (reviews, totalCount);
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
