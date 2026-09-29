using JesterTech.Server.Models;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IJwtService
    {
        /// <summary>
        /// Generates a JWT token for the given user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        string GenerateToken(Users user);
    }
}
