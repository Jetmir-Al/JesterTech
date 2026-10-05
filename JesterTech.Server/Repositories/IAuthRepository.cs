using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IAuthRepository
    {
        /// <summary>
        /// Gets a user by their ID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Users> GetUserById(int id, CancellationToken cancellationToken);

        /// <summary>
        /// Gets a user by their email.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        Task<Users> GetUserByEmail(string email, CancellationToken cancellationToken);
        /// <summary>
        /// Creates a new user in the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task CreateUser(Users user, CancellationToken cancellationToken);
        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task UpdateUser(Users user, CancellationToken cancellationToken);
        /// <summary>
        /// Deletes a user from the database.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteUser(Users user, CancellationToken cancellationToken);
        /// <summary>
        /// Saves changes to the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
