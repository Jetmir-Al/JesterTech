using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.Models
{
    public class Users
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Write Name")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Write Email")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Write Password")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Write Role")]
        public string Role { get; set; } = "Customer";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Purchases> Purchases { get; set; } = new List<Purchases>();
        public ICollection<Reviews> Reviews { get; set; } = new List<Reviews>();
    }
}
