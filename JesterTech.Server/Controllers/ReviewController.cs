using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Controllers
{
    [Route("api/[controller]")]
    public class ReviewController(IReviewService _reviewService): ControllerBase
    {

        [Authorize]
        [HttpPost("add/{productId}")]
        public async Task<IActionResult> CreateReview(int productId, [FromBody] CreateReviewDto dto, CancellationToken cancellationToken)
        {

            var userIdClaim = User.FindFirst("Id") ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest();
            }

            await _reviewService.CreateReview(productId, dto, userId, cancellationToken);

            return Ok();
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetReviewsForProduct(int productId, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var reviews = await _reviewService.GetReviewsForProduct(productId, pageNumber, pageSize, cancellationToken);
            return Ok(reviews);
        }
    }
}
