using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> CreatePurchase(int productId, [FromBody] CreatePurchaseDto dto)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized(new { message = "User is not logged in" });

            int userId = int.Parse(userIdClaim.Value);

            var product = await _productService.GetProductById(productId);
            if ( product == null)
                return BadRequest(new { message = "Product not found" });


            if (product.Quantity < dto.Quantity)
                return BadRequest(new { message = "Nuk ka sasi të mjaftueshme!" });

            await _purchaseService.CreatePurchaseById(productId, dto, userId);

            return Ok();

        }



        [HttpGet("user")]
        public async Task<IActionResult> GetPurchasesByUser(
            int page = 1,
            int pageSize = 5)
        {
            var userIdClaim = User.FindFirst("Id") ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized(new { message = "User is not logged in" });

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid user identity format." });
            }
            
            var result = await _purchaseService.GetPurchasesAsync(page, pageSize, userId);

            return Ok(result);
        }
    }
}
