using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Brand { get; set; }
        public int Garantee { get; set; }

        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string? Image { get; set; }
    }

    public record TopProducts(string Img);

    public class ProductsDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Brand { get; set; }
        public int Garantee { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string Specifications { get; set; }
        public string? Image { get; set; }

        public double AverageRating { get; set; } = 0;
    }

    public record AdvancedProductDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string? Image { get; set; }
        public double AverageRating { get; set; }
    }

    public record ProductByCategoryResponseDTO(
        int Id,
        string Title,
        string Brand,
        int Garantee,
        decimal Price,
        int Quantity,
        string Category,
        string Specifications,
        string? Image
    );

    public class InsertProductDTO
    {
        [Required]
        [StringLength(100, ErrorMessage = "The title must be between 1 and 100 characters.", MinimumLength = 1)]
        public string Title { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public int Garantee { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string Specifications { get; set; }
        public IFormFile? ImgFile { get; set; }
    }

    public class UpdateProductImgDTO
    {
        [Required]
        public IFormFile? ImgFile { get; set; }
    }
    public class UpdateProductDTO
    {
        [Required]
        [StringLength(100, ErrorMessage = "The title must be between 1 and 100 characters.", MinimumLength = 1)]
        public string Title { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        public int Garantee { get; set; }
        [Required]  
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string Specifications { get; set; }
        public IFormFile? ImgFile { get; set; }
    }

    public class ProductPaginationDTO
    {
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public List<AdvancedProductDto> Products { get; set; } = new List<AdvancedProductDto>();
    }

    public class AdminProductsPaginationDTO
    {
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public List<ProductsDTO> Products { get; set; } = new List<ProductsDTO>();
    }
}
