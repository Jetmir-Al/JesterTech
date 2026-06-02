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

    public class InsertProductDTO
    {
        public string Title { get; set; }
        public string Brand { get; set; }
        public int Garantee { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string Category { get; set; }
        public IFormFile? ImgFile { get; set; }
    }
}
