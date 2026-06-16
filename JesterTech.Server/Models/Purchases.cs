using System.ComponentModel.DataAnnotations.Schema;

namespace JesterTech.Server.Models
{
    public class Purchases
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public Users User { get; set; } = new Users();

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Products Product { get; set; }
         
        public DateTime PurchaseDate { get; set; }

        public int Quantity { get; set; }

        public string Address { get; set; } = string.Empty;
        public decimal Total { get; set; }

        public string CardholderName { get; set; } = string.Empty;

        public string CardNumber { get; set; } = string.Empty;
    }
}
