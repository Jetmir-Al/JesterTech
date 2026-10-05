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
        Task<Users> GetUserById(int id);

        /// <summary>
        /// Gets a user by their email.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        Task<Users> GetUserByEmail(string email);
        /// <summary>
        /// Creates a new user in the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task CreateUser(Users user);
        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task UpdateUser(Users user);
        /// <summary>
        /// Deletes a user from the database.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task DeleteUser(Users user);
        /// <summary>
        /// Saves changes to the database.
        /// </summary>
        Task Save();
    }
}
