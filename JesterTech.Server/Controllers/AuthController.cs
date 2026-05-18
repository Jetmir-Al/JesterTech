using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JesterTech.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IPasswordHasher<Users> _passwordHasher;
        private readonly IConfiguration _configuration; 

        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<Users>();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthDTO authDTO)
        {
            if (authDTO == null)
            {
                return BadRequest("Invalid Credentials!");
            }
            var userEmail = _authRepository.GetUserByEmail(authDTO.Email);

            if (userEmail != null)
            {
                return BadRequest("Invalid Credentials");
            }
            var user = new Users
            {
                Name = authDTO.Name,
                Email = authDTO.Email,
                CreatedAt = DateTime.Now
            };
            user.Password = _passwordHasher.HashPassword(user, authDTO.Password);

            _authRepository.CreateUser(user);
            _authRepository.Save();

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO == null)
            {
                return BadRequest("User data is null.");
            }

            var user = _authRepository.GetUserByEmail(loginDTO.Email);
            if (user == null)
            {
                return Unauthorized("Email or password incorrect.");
            }

            var res = _passwordHasher.VerifyHashedPassword(user, user.Password, loginDTO.Password);
            if (res == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Email or password incorrect.");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("Id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"] ?? "fallback_key_for_local_dev_only"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(6), 
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,             
                Secure = true,               
                SameSite = SameSiteMode.None, 
                Expires = DateTimeOffset.UtcNow.AddDays(6)
            };

            Response.Cookies.Append("JesterTechToken", tokenString, cookieOptions);

            return Ok(new
            {
                message = "Login successful.",
                Id = user.Id,
                Name = user.Name,
                Email = user.Email
            });
        }

        [Authorize]
        [HttpGet("status")]
        public IActionResult CheckStatus()
        {
            var userId = User.FindFirst("Id")?.Value;
            var name = User.FindFirst(ClaimTypes.Name)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            if (userId == null || name == null || email == null)
            {
                return Unauthorized("User is not authenticated.");
            }

            return Ok(new
            {
                message = "User is authenticated.",
                Id = userId,
                Name = name,
                Email = email
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
            return Ok("Logout successful.");
        }
    }
}