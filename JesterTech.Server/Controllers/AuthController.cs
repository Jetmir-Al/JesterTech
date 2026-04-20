using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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
        private readonly IPasswordHasher<Users> _passwordHasher;
        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
            _passwordHasher = new PasswordHasher<Users>();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthDTO authDTO)
        {
            if (authDTO == null)
            {
                return BadRequest("Invalid Credecials!");
            }
            var userEmail = _authRepository.GetUserByEmail(authDTO.Email);

            if (userEmail != null)
            {
                return BadRequest("Invalid Credecials");
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
                new Claim("Id", user.Id.ToString())
            };


            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7)
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);



            return Ok(new
            {
                message = "Login successful.",
                Id = user.Id,
                Name = user.Name,
                Email = user.Email
            });
        }

        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
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
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok("Logout successful.");
        }
    }
}
