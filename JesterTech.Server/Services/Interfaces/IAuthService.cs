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
        Task<string> Register (AuthDTO authDto, CancellationToken cancellationToken);
        /// <summary>
        /// Logs in a user with the provided login credentials and returns a JWT token if successful.
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns></returns>
        Task<AuthResultDTO> Login(LoginDTO loginDto, CancellationToken cancellationToken);
    }
}