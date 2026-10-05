using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JesterTech.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;


        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthDTO authDTO)
        {
            if (authDTO == null || authDTO.Email == null || authDTO.Password == null)
            {
                return BadRequest();
            }

            var result = await _authService.Register(authDTO);
            if(result == null || result == "Invalid Credentials")
            {
                return BadRequest();
            }

            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var result = await _authService.Login(loginDTO);
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            SetAuthCookie(result.Token);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("status")]
        public IActionResult CheckStatus()
        {
            var userId = User.FindFirst("Id")?.Value;
            var name = User.FindFirst(ClaimTypes.Name)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId == null || name == null || email == null || role == null)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            return Ok(new
            {
                message = "User is authenticated.",
                Id = userId,
                Name = name,
                Email = email,
                Role = role
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            if(!Request.Cookies.ContainsKey("JesterTechToken"))
            {
                return BadRequest(new { message = "No authentication token found." });
            }

            ClearAuthCookie();
            return Ok(new { message = "Logout successful." });
        }

        private void SetAuthCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(6)
            };

            Response.Cookies.Append("JesterTechToken", token, cookieOptions);
        }

        private void ClearAuthCookie()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(-1)
            };
            Response.Cookies.Append("JesterTechToken", "", cookieOptions);
        }
    }
}