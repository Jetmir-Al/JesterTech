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

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
