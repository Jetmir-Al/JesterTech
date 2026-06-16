using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JesterTech.Server.Models
{
    public class Reviews
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public Users User { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Products Product { get; set; } 

        [Required(ErrorMessage = "Write Review")]
        public int Rating { get; set; }

        [Required(ErrorMessage = "Write Comment")]
        public string Comment { get; set; } = string.Empty;
    }
}
