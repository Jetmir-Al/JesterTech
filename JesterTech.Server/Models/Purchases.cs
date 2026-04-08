namespace JesterTech.Server.Models
{
    public class Purchases
    {
        public int Id { get; set; }


        public int UserId { get; set; }
        public Users User { get; set; }


        public int ProductID { get; set; }
        public Products Products { get; set; }

        public DateTime PurchaseDate { get; set; }

        public int Quantity { get; set; }

        public decimal Total { get; set; }

        public string CardholderName { get; set; } = string.Empty;

        public string CardNumber { get; set; } = string.Empty;
    }
}
