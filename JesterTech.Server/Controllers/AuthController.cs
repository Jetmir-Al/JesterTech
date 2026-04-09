using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Controllers
{
    public class AuthController : ControllerBase
    {
        public IActionResult Index()
        {
            return Ok("Authentication successful");
        }
    }
}
