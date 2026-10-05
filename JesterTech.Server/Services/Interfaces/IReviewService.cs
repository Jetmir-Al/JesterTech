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
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task CreateReview(int productId, CreateReviewDto createReviewDto, int userId, CancellationToken cancellationToken);
        /// <summary>
        /// Gets reviews for a specific product with pagination.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<ReviewPaginationDTO> GetReviewsForProduct(int productId, int pageNumber, int pageSize, CancellationToken cancellationToken);

    }
}
