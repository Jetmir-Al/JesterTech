using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
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
        private readonly IAuthRepository _authRepository;
        private readonly PasswordHasher<Users> _passwordHasher;
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;


        public AuthController(IAuthRepository authRepository, IConfiguration configuration, IAuthService authService)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<Users>();
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthDTO authDTO)
        {
            if (authDTO == null)
            {
                return BadRequest(new { message = "Invalid Credentials!" });
            }
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                Console.WriteLine(errors);
            }


            var userEmail = _authRepository.GetUserByEmail(authDTO.Email);

            if (userEmail != null)
            {
                return Conflict(new { message = "Invalid Credentials" });
            }
            var user = new Users
            {
                Name = authDTO.Name,
                Email = authDTO.Email,
                Role = authDTO.Role,
                CreatedAt = DateTime.UtcNow
            };
            user.Password = _passwordHasher.HashPassword(user, authDTO.Password);

            _authRepository.CreateUser(user);
            _authRepository.Save();

            return Ok(new { message = "User registered successfully" });
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
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTimeOffset.UtcNow.AddDays(-1) 
            };

            Response.Cookies.Append("JesterTechToken", "", cookieOptions);
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
    }
}