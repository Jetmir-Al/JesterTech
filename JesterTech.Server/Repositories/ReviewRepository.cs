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

        public void CreateReview(Reviews review)
        {
            _context.Reviews.Add(review);
            Save();
        }

        public void DeleteReview(Reviews review)
        {
            if (review != null)
            {
                _context.Reviews.Remove(review);
                Save();
            }
        }

        public List<Reviews> GetReviewsByProductId(int productId)
        {
            return _context.Reviews
                .Include(r => r.User)
                .Where(r => r.ProductId == productId)
                .AsNoTracking()
                .ToList();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
