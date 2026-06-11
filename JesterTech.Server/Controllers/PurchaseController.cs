using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
                ProductID = product.Id,
                Quantity = dto.Quantity,
                Total = dto.Quantity * product.Price,
                CardholderName = dto.CardholderName,
                CardNumber = dto.CardNumber.Length >= 4 ? dto.CardNumber[^4..] : dto.CardNumber,
                PurchaseDate = DateTime.Now
            };

            _purchaseRepository.CreatePurchase(purchase);
            _purchaseRepository.Save();

            return Ok(new { message = "Purchase created successfully." });
        }



        [HttpGet("user/{userId}")]
        public IActionResult GetPurchasesByUser(int userId)
        {
            var purchases = _purchaseRepository.GetPurchasesByUserId(userId)
                .Select(p => new PurchaseDTO
                {
                    Id = p.Id,
                    UserName = p.User.Name,
                    ProductTitle = p.Products.Title,
                    Quantity = p.Quantity,
                    Total = p.Total,
                    PurchaseDate = p.PurchaseDate,
                    CardholderName = p.CardholderName,
                    MaskedCardNumber = "**** **** **** " + p.CardNumber,
                    Image = p.Products.Image
                })
                .ToList();

            return Ok(purchases);
        }
    }
}
