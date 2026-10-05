using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IReviewRepository
    {
        Task<List<Reviews>> GetReviewsByProductId(int productId);
        Task CreateReview(Reviews review);
        Task DeleteReview(Reviews review);
        Task SaveAsync();
    }
}
