using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(
        IProductService _productService
        ) : ControllerBase
    {

        [HttpGet("products")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetProducts(CancellationToken cancellationToken)
        {
            try
            {
                var products = await _productService.GetAllProducts(cancellationToken);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories(CancellationToken cancellationToken)
        {
            var categories = await _productService.GetProductCategories(cancellationToken);
            return Ok(categories);
        }

        [HttpGet("brands")]
        public async Task<IActionResult> GetBrands(CancellationToken cancellationToken)
        {
            var brands = await _productService.GetProductBrands(cancellationToken);
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id, CancellationToken cancellationToken)
        {
            var product = await _productService.GetProductById(id, cancellationToken);
            return Ok(product);
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedProducts(CancellationToken cancellationToken)
        {
            var products = await _productService.GetFeaturedProducts(cancellationToken);
            return Ok(products);
        }

        [HttpGet("advanced")]
        public async Task<IActionResult> GetProductsAdvanced(
            CancellationToken cancellationToken,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? search = null,
            [FromQuery] List<string>? categories = null,
            [FromQuery] string? sort = "new")
        {
            var products = await _productService.GetProductsPagination(page, pageSize, search, categories, sort, cancellationToken);
            return Ok(products);
        }

        [HttpGet("topProducts")]
        public async Task<IActionResult> GetTopProducts(CancellationToken cancellationToken)
        {
            var products = await _productService.GetTopProducts(cancellationToken);
            return Ok(products);
        }

        [HttpPost("UpdateProduct")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] UpdateProductDTO productDto, CancellationToken cancellationToken)
        {
            await _productService.UpdateProductImg(id, productDto, cancellationToken);
            return Ok();
        }

        [HttpPost("InsertProduct")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> InsertProduct([FromForm] InsertProductDTO productDto, CancellationToken cancellationToken)
        {
            await _productService.CreateProduct(productDto, cancellationToken);
            return Ok();
        }

        [HttpDelete("DeleteProduct/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id, CancellationToken cancellationToken)
        {
            await _productService.DeleteProductById(id, cancellationToken);

            return Ok();
        }
    }
}
