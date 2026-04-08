using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.Models
{
    public class Reviews
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public Users User { get; set; }


        public int ProductID { get; set; }
        public Products Products { get; set; }

        [Required(ErrorMessage = "Write Review")]
        public int Rating { get; set; }

        [Required(ErrorMessage = "Write Comment")]
        public string Comment { get; set; }
    }
}
