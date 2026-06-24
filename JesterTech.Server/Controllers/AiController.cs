using JesterTech.Server.DTO;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace JesterTech.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class AiController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public AiController(IProductRepository productRepository, IConfiguration configuration, HttpClient httpClient)
        {
            _productRepository = productRepository;
            _configuration = configuration;
            _httpClient = httpClient;
        }


        [HttpPost("ask")]
        public async Task<IActionResult> AskProductAi([FromBody] AiQuestionDTO dto)
        {
            var product = _productRepository.GetProductById(dto.ProductId);
            if (product == null)
            {
                return NotFound(new { message = "Product not found." });
            }

            var apiKey = _configuration["AiSettings: ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                return StatusCode(500, "AI service configuration is missing.");
            }

            var structuredPrompt = $@"
You are an expert AI product assistant for the JesterTech e-commerce platform.
Answer the customer's question using ONLY the system technical specifications provided below. 
If the answer cannot be confidently inferred from the specifications, respond politely: 'I do not have that specific detail available for this item.'

[PRODUCT SPECIFICATIONS]
Title: {product.Title}
Brand: {product.Brand}
{product.Specifications}
[/PRODUCT SPECIFICATIONS]

Customer Question: {dto.UserQuestion}
";

            var requestBody = new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[]
                 {
                    new { role = "user", content = structuredPrompt }
                },
                temperature = 0.2
            };

            var jsonPayload = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

                var response = await _httpClient.PostAsync(
                    "https://api.groq.com/openai/v1/chat/completions",
                    content
                );

                if (!response.IsSuccessStatusCode)
                {
                    var groqErrorResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(groqErrorResponse);
                    return StatusCode((int)response.StatusCode, "Error communicating with the upstream Groq AI provider.");
                }

                var responseString = await response.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(responseString);
                var aiResponseText = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                return Ok(new { answer = aiResponseText?.Trim() });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server processing error: {ex.Message}");
            }
        }


        [HttpPost("ask-general")]
        public async Task<IActionResult> AskGlobalAi([FromBody] GeneralQuestionDTO dto)
        {
            var apiKey = _configuration["AiSettings: ApiKey"];
            var allProducts = _productRepository.GetAllProducts().ToList();

            var catalogBuilder = new StringBuilder();
            foreach (var p in allProducts)
            {
                catalogBuilder.AppendLine($"[PRODUCT: {p.Title}]");
                catalogBuilder.AppendLine($"Brand: {p.Brand} | Price: ${p.Price}");
                catalogBuilder.AppendLine(p.Specifications);
                catalogBuilder.AppendLine("--------------------------------");
            }

            var globalPrompt = $@"
You are a brilliant retail shopping assistant for the JesterTech tech store.
Help the customer choose or compare items using ONLY the strict inventory list provided below.
If they ask for something we do not sell, say: 'We do not carry that specific item, but here are our best alternatives...'

[STORE INVENTORY CATALOG]
{catalogBuilder}
[/STORE INVENTORY CATALOG]

Customer Question: {dto.UserQuestion}
";
            var requestBody = new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[]
                 {
                    new { role = "user", content = globalPrompt }
                },
                temperature = 0.2
            };

            var jsonPayload = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

                var response = await _httpClient.PostAsync(
                    "https://api.groq.com/openai/v1/chat/completions",
                    content
                );

                if (!response.IsSuccessStatusCode)
                {
                    var groqErrorResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(groqErrorResponse);
                    return StatusCode((int)response.StatusCode, "Error communicating with the upstream Groq AI provider.");
                }

                var responseString = await response.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(responseString);
                var aiResponseText = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                return Ok(new { answer = aiResponseText?.Trim() });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server processing error: {ex.Message}");
            }
        }
    }
}
