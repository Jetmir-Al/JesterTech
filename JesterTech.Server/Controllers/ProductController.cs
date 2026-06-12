using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
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
                    return NotFound(new { message = "No products found." });
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
        [HttpGet("brands")]
        public IActionResult GetBrands()
        {
            var brands = _productRepository.GetAllProducts()
                .Select(p => p.Brand)
                .Distinct()
                .ToList();
            return Ok(brands);
        }


        [HttpGet("{id}")]
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

        [HttpPost("InsertProduct")]
        public async Task<IActionResult> InsertProduct([FromForm] InsertProductDTO productDto)
        {
            var product = new Products
            {
                Title = productDto.Title,
                Brand = productDto.Brand,
                Garantee = productDto.Garantee,
                Price = productDto.Price,
                Quantity = productDto.Quantity,
                Category = productDto.Category,
            };

            if (productDto.ImgFile != null && productDto.ImgFile.Length > 0)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + productDto.ImgFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    productDto.ImgFile.CopyTo(fileStream);
                }


                product.Image = "/images/" + uniqueFileName;
            }

            _productRepository.CreateProduct(product);
            _productRepository.Save();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
    }
}
