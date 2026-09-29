using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JesterTech.Server.Services.Service
{
    public class AuthService(
        IAuthRepository _authRepository,
        IJwtService _jwtService
        ) : IAuthService
    {
        private readonly PasswordHasher<Users> _passwordHasher;

        public async Task<AuthResultDTO> Login(LoginDTO loginDto)
        {
            var user = _authRepository.GetUserByEmail(loginDto.Email);

            var res = _passwordHasher.VerifyHashedPassword(user, user.Password, loginDto.Password);
            
            if (res == PasswordVerificationResult.Failed) 
                return null;

            var token = _jwtService.GenerateToken(user);


            return new AuthResultDTO
            {
                Token = token,
                User = new LoginResponseDTO
                {
                    Message = "Login successful.",
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt,
                }
            };
        }

        public Task Logout()
        {
            throw new NotImplementedException();
        }

        public Task<LoginResponseDTO> RefreshToken()
        {
            throw new NotImplementedException();
        }

        public Task<string> Register(AuthDTO authDto)
        {
            throw new NotImplementedException();
        }
    }
}
