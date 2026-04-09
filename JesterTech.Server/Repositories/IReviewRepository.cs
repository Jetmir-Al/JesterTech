using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IReviewRepository
    {
        List<Reviews> GetReviewsByProductId(int productId);
        void CreateReview(Reviews review);
        void DeleteReview(Reviews review);
        void Save();
    }
}
