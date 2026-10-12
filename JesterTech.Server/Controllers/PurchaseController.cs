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
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; ;
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim);

            var product = await _productService.GetProductById(productId, cancellationToken);
            if ( product == null)
                return BadRequest();


            if (product.Quantity < dto.Quantity)
                return BadRequest(new { message = "Nuk ka sasi të mjaftueshme!" });

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
                return Unauthorized(new { message = "User is not logged in" });

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return BadRequest(new { message = "Invalid user identity format." });
            }
            
            var result = await _purchaseService.GetPurchasesAsync(page, pageSize, userId, cancellationToken);

            return Ok(result);
        }
    }
}
