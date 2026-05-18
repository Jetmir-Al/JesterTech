using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.Models
{
    public class Users
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Write Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Write Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Write Password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Write Role")]
        public string? Role { get; set; } = "Customer";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<Purchases> Purchases { get; set; }
        public ICollection<Reviews> Reviews { get; set; }
    }
}
