using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Identity;


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
            var user = await _authRepository.GetUserByEmail(loginDto.Email);

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
        
        public async Task<string> Register(AuthDTO authDto)
        {
            var userEmail = await _authRepository.GetUserByEmail(authDto.Email);

            if (userEmail != null)
                return "Invalid Credentials";

            var user = new Users
            {
                Name = authDto.Name,
                Email = authDto.Email,
                Role = authDto.Role,
                CreatedAt = DateTime.UtcNow,
            };

            user.Password = _passwordHasher.HashPassword(user, authDto.Password);
            await _authRepository.CreateUser(user);
            return "User registered successfully.";
        }
    }
}
