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
        public async Task CreateReview(int productId, CreateReviewDto createReviewDto, int userId)
        {
            var product = await _productRepository.GetProductById(productId);

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

            await _reviewRepository.CreateReview(review);
        }

        public async Task<ReviewPaginationDTO> GetReviewsForProduct(int productId, int pageNumber, int pageSize)
        {
            var reviews = await _reviewRepository.GetReviewsByProductId(productId);

            return new ReviewPaginationDTO
            {
                TotalCount = reviews.Count(),
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
