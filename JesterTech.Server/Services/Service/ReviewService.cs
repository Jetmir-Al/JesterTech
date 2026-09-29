using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;

namespace JesterTech.Server.Services.Service
{
    public class ReviewService : IReviewService
    {
        public Task CreateReview(int productId, CreateReviewDto createReviewDto)
        {
            throw new NotImplementedException();
        }

        public Task<ReviewPaginationDTO> GetReviewsForProduct(int productId, int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}
