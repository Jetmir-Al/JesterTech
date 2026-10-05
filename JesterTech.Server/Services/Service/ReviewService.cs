using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services.Interfaces;

namespace JesterTech.Server.Services.Service
{
    public class ReviewService(
        IReviewRepository _reviewRepository,
        IProductRepository _productRepository
        ) : IReviewService
    {
        public async Task CreateReview(int productId, CreateReviewDto createReviewDto, int userId, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetProductById(productId, cancellationToken);

            if(product == null)
            {
                return;
            }

            var review = new Reviews
            {
                ProductId = productId,
                UserId = userId,
                Rating = createReviewDto.Rating,
                Comment = createReviewDto.Comment,
            };

            await _reviewRepository.CreateReview(review, cancellationToken);
        }

        public async Task<ReviewPaginationDTO> GetReviewsForProduct(int productId, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var (reviews, totalCount) = await _reviewRepository.GetReviewsByProductId(productId, cancellationToken);

            return new ReviewPaginationDTO
            {
                TotalCount = totalCount,
                Page = pageNumber,
                PageSize = pageSize,
                Reviews = reviews.Select(r => new ReviewDTO
                {
                    Id = r.Id,
                    User = new UserDto
                    {
                        Name = r.User.Name,
                    },
                    Rating = r.Rating,
                    Comment = r.Comment,
                }).ToList()
            };
            
        }
    }
}
