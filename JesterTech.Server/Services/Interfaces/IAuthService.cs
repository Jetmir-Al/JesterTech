using JesterTech.Server.DTO;
using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IAuthService
    {
        /// <summary>
        /// Registers a new user with the provided authentication details.
        /// </summary>
        /// <param name="authDto"></param>
        /// <returns></returns>
        Task<string> Register (AuthDTO authDto);
        /// <summary>
        /// Logs in a user with the provided login credentials and returns a JWT token if successful.
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns></returns>
        Task<AuthResultDTO> Login(LoginDTO loginDto);
        /// <summary>
        /// Refreshes the JWT token for the currently authenticated user and returns a new token if successful.
        /// </summary>
        /// <returns></returns>
        Task<LoginResponseDTO> RefreshToken();
        /// <summary>
        /// Logs out the currently authenticated user by invalidating their JWT token.
        /// </summary>
        /// <returns></returns>
        Task Logout();
    }
}