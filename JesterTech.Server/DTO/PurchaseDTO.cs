using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.DTO
{
    public class PurchaseDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string ProductTitle { get; set; }
        public int Quantity { get; set; }
        public string Address { get; set; }
        public decimal Total { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string CardholderName { get; set; }
        public string MaskedCardNumber { get; set; }
        public string? Image { get; set; }
    }

    public class CreatePurchaseDto
    {
        public int Quantity { get; set; }
        public string Address { get; set; }
        public string CardholderName { get; set; }
        public string CardNumber { get; set; }
        public DateTime PurchaseDate { get; set; } = DateTime.Now;
    }
}
