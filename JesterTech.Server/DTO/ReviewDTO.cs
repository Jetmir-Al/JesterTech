using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.DTO
{
    public class ReviewDTO
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public UserDto User { get; set; }
        public ProductDTO Product { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
    public class CreateReviewDto
    {
        [Required]
        public int Rating { get; set; }
        [Required]
        public string Comment { get; set; }
    }
}
