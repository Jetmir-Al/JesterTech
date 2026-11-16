using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JesterTech.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PurchaseController(
        IPurchaseService _purchaseService,
        IProductService _productService
        ) : ControllerBase
    {

        [HttpPost("create/{productId}")]
        [ProducesResponseType(typeof(void), 200)]
        public async Task<IActionResult> CreatePurchase(int productId, [FromBody] CreatePurchaseDto dto, CancellationToken cancellationToken)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest(new { message = "Invalid user session!" });
            }

            await _purchaseService.CreatePurchaseById(productId, dto, userId, cancellationToken);

            return Ok();

        }

        [HttpGet("user")]
        [ProducesResponseType(typeof(PurchasePaginationDTO), 200)]
        public async Task<IActionResult> GetPurchasesByUser(
            CancellationToken cancellationToken,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized(new { message = "Invalid user session!" });

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest(new { message = "Invalid user session!" });
            }
            
            var result = await _purchaseService.GetPurchasesAsync(page, pageSize, userId, cancellationToken);

            return Ok(result);
        }
    }
}
