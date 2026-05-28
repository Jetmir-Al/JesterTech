using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(IProductRepository productRepository, IWebHostEnvironment webHostEnvironment)
        {
            _productRepository = productRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            try
            {

                var products = _productRepository.GetAllProducts().ToList();
                if (!products.Any())
                {
                    return NotFound("No products found.");
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _productRepository.GetAllProducts()
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(categories);
        }


        [HttpGet("products/{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpGet("featured")]
        public IActionResult GetFeaturedProducts()
        {
            var products = _productRepository.GetAllProducts()
                .Take(8)
                .ToList();

            return Ok(products);
        }

        [HttpGet("advanced")]
        public IActionResult GetProductsAdvanced(
            int page = 1,
            int pageSize = 20,
            string? search = null,
            string? categories = null,
            string? sort = null)
        {
            var query = _productRepository.GetAllProducts().AsQueryable();


            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(b =>
                    b.Title.Contains(search) ||
                    b.Brand.Contains(search));
            }


            if (!string.IsNullOrEmpty(categories))
            {
                var list = categories.Split(',').ToList();
                query = query.Where(b => list.Contains(b.Category));
            }


            query = sort switch
            {
                "name" => query.OrderBy(b => b.Title),
                "price" => query.OrderBy(b => b.Price),
                "new" => query.OrderByDescending(b => b.Id),
                "old" => query.OrderBy(b => b.Id),
                _ => query.OrderBy(b => b.Id)
            };


            var productCount = query.Count();


            var products = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                data = products,
                page = page,
                totalProducts = productCount,
                totalPages = (int)Math.Ceiling(productCount / (double)pageSize)
            });
        }
    }
}
