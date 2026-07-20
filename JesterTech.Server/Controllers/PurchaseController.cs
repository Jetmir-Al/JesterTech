using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace JesterTech.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PurchaseController: ControllerBase
    {
        private readonly IPurchaseRepository _purchaseRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IProductRepository _productRepository;

        public PurchaseController(
            IPurchaseRepository purchaseRepository,
            IAuthRepository authRepository,
            IProductRepository productRepository)
        {
            _purchaseRepository = purchaseRepository;
            _authRepository = authRepository;
            _productRepository = productRepository;
        }

        [HttpPost("create/{productId}")]
        public IActionResult CreatePurchase(int productId, [FromBody] CreatePurchaseDto dto)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized(new { message = "User is not logged in" });

            int userId = int.Parse(userIdClaim.Value);

            var product = _productRepository.GetProductById(productId);
            if ( product == null)
                return BadRequest(new { message = "Product not found" });


            if (product.Quantity < dto.Quantity)
                return BadRequest(new { message = "Nuk ka sasi të mjaftueshme!" });


            product.Quantity -= dto.Quantity;
            _productRepository.Save();

            var purchase = new Purchases
            {
                UserId = userId,
                ProductId = product.Id,
                Quantity = dto.Quantity,
                Address = dto.Address,
                Total = dto.Quantity * product.Price,
                CardholderName = dto.CardholderName,
                CardNumber = dto.CardNumber.Length >= 4 ? dto.CardNumber[^4..] : dto.CardNumber,
                PurchaseDate = DateTime.UtcNow
            };

            _purchaseRepository.CreatePurchase(purchase);
            _purchaseRepository.Save();

            return Ok(new { message = "Purchase created successfully." });
        }



        [HttpGet("user")]
        public IActionResult GetPurchasesByUser(
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
            try
            {

                var purchases = _purchaseRepository.GetPurchasesByUserId(userId)
                    .Select(p => new PurchaseDTO
                    {
                        Id = p.Id,
                        UserName = p.User.Name,
                        ProductTitle = p.Product.Title,
                        Quantity = p.Quantity,
                        Total = p.Total,
                        Address = p.Address,
                        PurchaseDate = p.PurchaseDate,
                        CardholderName = p.CardholderName,
                        MaskedCardNumber = "**** **** **** " + p.CardNumber,
                        Image = p.Product.Image
                    }).AsQueryable();

                var purchaseCount = purchases.Count();

                var purchasesAdvanced = purchases
                    .OrderByDescending(p => p.Id)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                return Ok(new
                {
                    data = purchasesAdvanced,
                    page = page,
                    totalPurchases = purchaseCount,
                    totalPages = (int)Math.Ceiling(purchaseCount / (double)pageSize)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving purchases.", error = ex.Message });
            }
        }
    }
}
