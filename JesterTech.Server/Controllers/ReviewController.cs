using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ReviewController: ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IProductRepository _productRepository;

        public ReviewController(IReviewRepository reviewRepository, IProductRepository productRepository)
        {
            _reviewRepository = reviewRepository;
            _productRepository = productRepository;
        }

        [HttpPost("add/{productId}")]
        public IActionResult CreateReview(int productId, [FromBody] CreateReviewDto dto)
        {

            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized(new { message = "User is not logged in" });

            int userId = int.Parse(userIdClaim.Value);


            var product = _productRepository.GetProductById(productId);
            if (product == null)
                return BadRequest(new { message = "Product not found" });


            var review = new Reviews
            {
                ProductID = productId,  
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };

            _reviewRepository.CreateReview(review);
            _reviewRepository.Save();

            return Ok(new { message = "Review created successfully." });
        }

        [HttpGet("product/{productId}")]
        public IActionResult GetReviewsForProduct(int productId)
        {
            var reviews = _reviewRepository.GetReviewsByProductId(productId)
                 .Select(r => new ReviewDTO
                 {
                     Id = r.Id,
                     User = new UserDto
                     {
                         Name = r.User.Name
                     },
                     Rating = r.Rating,
                     Comment = r.Comment
                 })
                .ToList(); ;
            return Ok(reviews);
        }
    }
}
