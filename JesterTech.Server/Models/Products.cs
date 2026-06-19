using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.Models
{
    public class Products
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please enter the product title")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please enter the product specifications")]
        public string Specifications { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please enter the Brand's name")]
        public string Brand { get; set; } = string.Empty;
        [Required(ErrorMessage = "Please enter the year of garatee")]
        public int Garantee { get; set; }

        [Required(ErrorMessage = "Please enter the product price")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "Please enter the product quantity")]
        public int Quantity { get; set; }
        [Required(ErrorMessage = "Please enter the product category")]
        public string Category { get; set; } = string.Empty;
        public string? Image { get; set; }
    }
}
