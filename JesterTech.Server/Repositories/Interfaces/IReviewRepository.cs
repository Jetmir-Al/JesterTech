using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        /// <summary>
        /// Gets the reviews for a specific product by its ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<(List<Reviews>, int TotalCount)> GetReviewsByProductId(int productId, CancellationToken cancellationToken);
        /// <summary>
        /// Creates a new review for a product.
        /// </summary>
        /// <param name="review"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task CreateReview(Reviews review, CancellationToken cancellationToken);
        /// <summary>
        /// Deletes a review from the database.
        /// </summary>
        /// <param name="reviewId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteReview(int reviewId, CancellationToken cancellationToken);
        /// <summary>
        /// Saves changes to the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
