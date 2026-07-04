using JesterTech.Server.DTO;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace JesterTech.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AiController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IPurchaseRepository _purchaseRepository;
        private readonly IAiService _aiService;

        public AiController(IProductRepository productRepository, IPurchaseRepository purchaseRepository, IAiService aiService)
        {
            _productRepository = productRepository;
            _purchaseRepository = purchaseRepository;
            _aiService = aiService;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> AskProductAi([FromBody] AiQuestionDTO dto)
        {
            var product = _productRepository.GetProductById(dto.ProductId);
            if (product == null) return NotFound(new { message = "Product not found." });

            var structuredPrompt = $@"
You are an expert AI product assistant for the EcomTech e-commerce platform.
Answer the customer's question using ONLY the system technical specifications provided below. 
If the answer cannot be confidently inferred from the specifications, respond politely: 
'I do not have that specific detail available for this item.'

PRODUCT SPECIFICATIONS]
Title: {product.Title}
Brand: {product.Brand}
{product.Specifications}
[/PRODUCT SPECIFICATIONS]

Customer Question: {dto.UserQuestion},
Customer Answer preference: {dto.Preference}";

            try
            {
                var answer = await _aiService.GetAiResponseAsync(structuredPrompt);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("ask-general")]
        public async Task<IActionResult> AskGlobalAi([FromBody] GeneralQuestionDTO dto)
        {
            var allProducts = _productRepository.GetAllProducts();
            var catalogBuilder = new StringBuilder();
            foreach (var p in allProducts)
            {
                catalogBuilder.AppendLine($"[PRODUCT: {p.Title}] | Brand: {p.Brand} | Price: ${p.Price}\n{p.Specifications}\n---");
            }

            var globalPrompt = $@"
You are a brilliant retail shopping assistant for the EcomTech tech store.
Help the customer choose or compare items using ONLY the strict inventory list provided below.
If they ask for something we do not sell, say: 'We do not carry that specific item, but here are our best alternatives...'

[STORE INVENTORY CATALOG]
{catalogBuilder}
[/STORE INVENTORY CATALOG]

Customer Question: {dto.UserQuestion}
Customer Answer preference: {dto.Preference}";

            try
            {
                var answer = await _aiService.GetAiResponseAsync(globalPrompt);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize]
        [HttpPost("ask-purchases")]
        public async Task<IActionResult> AskPurchasesAi([FromBody] GeneralQuestionDTO dto)
        {
            var userIdClaim = User.FindFirst("Id") ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized(new { message = "User is not logged in" });

            if (!int.TryParse(userIdClaim.Value, out int userId))
            {
                return BadRequest(new { message = "Invalid user identity format." });
            }

            var allPurchasesOfUser = _purchaseRepository.GetPurchasesByUserId(userId).Select(p => new PurchaseAiDTO
            {
                Id = p.Id,
                UserName = p.User.Name,
                ProductTitle = p.Product.Title,
                Quantity = p.Quantity,
                Total = p.Total,
                Address = p.Address,
                PurchaseDate = p.PurchaseDate,
                CardholderName = p.CardholderName,
                Specifications = p.Product.Specifications
            }).ToList();

            var catalogBuilder = new StringBuilder();
            foreach (var p in allPurchasesOfUser)
            {
                catalogBuilder.AppendLine($"[PRODUCT: {p.ProductTitle}]");
                catalogBuilder.AppendLine($"Total: {p.Total} | Quantity: {p.Quantity}");
                catalogBuilder.AppendLine($"Date: {p.PurchaseDate} | Bank Name: {p.CardholderName}");
                catalogBuilder.AppendLine($"Address: {p.Address}");
                catalogBuilder.AppendLine(p.Specifications);
                catalogBuilder.AppendLine("--------------------------------");
            }

            var globalPrompt = $@"
You are a brilliant retail shopping assistant for the EcomTech tech store.
Help the customer learn of the history of their purchases.
If they ask for something they did not buy, say: 'You did not buy that specific item, but here are other products you have bought...'

[PURCHASE CATALOG]
{catalogBuilder}
[/PURCHASE CATALOG]

Customer Question: {dto.UserQuestion}
Customer Answer preference: {dto.Preference}";
            try
            {
                var answer = await _aiService.GetAiResponseAsync(globalPrompt);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("ask-AiCompare")]
        public async Task<IActionResult> AskCompareAi([FromBody] CompareAiQuestionDTO dto)
        {
            var product1 = _productRepository.GetProductById(dto.ProductId1);
            var product2 = _productRepository.GetProductById(dto.ProductId2);
            if(product1 == null || product2 == null)
            {
                return NotFound(new { message = "One or both products not found." });
            }
            if (product1.Category != product2.Category)
            {
                return BadRequest(new { message = "Make sure to chose items in the same category!"});
            }
            var catalogBuilder = new StringBuilder();

            catalogBuilder.AppendLine($"[PRODUCT: {product1.Title}] | Brand: {product1.Brand} | Price: ${product1.Price}\n{product1.Specifications}\n---");
            catalogBuilder.AppendLine($"[PRODUCT: {product2.Title}] | Brand: {product2.Brand} | Price: ${product2.Price}\n{product2.Specifications}\n---");

            var globalPrompt = $@"
You are a brilliant retail shopping assistant for the EcomTech tech store.
Help the customer compare or chose one of the items using ONLY the strict inventory list provided below.
If they ask for something they didnt select, say: 'Make sure to ask about the chosen options.'

[STORE INVENTORY CATALOG]
{catalogBuilder}
[/STORE INVENTORY CATALOG]

Customer Question: {dto.UserQuestion}
Customer Answer preference: {dto.Preference}";


            try
            {
                var answer = await _aiService.GetAiResponseAsync(globalPrompt);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}