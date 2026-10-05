using JesterTech.Server.DTO;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IReviewService
    {
        /// <summary>
        /// Creates a new review for a product.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="createReviewDto"></param>
        /// <returns></returns>
        Task CreateReview(int productId, CreateReviewDto createReviewDto, int userId);
        /// <summary>
        /// Gets reviews for a specific product with pagination.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<ReviewPaginationDTO> GetReviewsForProduct(int productId, int pageNumber, int pageSize);

    }
}
