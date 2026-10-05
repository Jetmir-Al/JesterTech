using JesterTech.Server.DTO;
using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IPurchaseRepository
    {
        /// <summary>
        /// Gets all purchases asynchronously.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<Purchases>> GetAllAsync(CancellationToken cancellationToken);
        /// <summary>
        /// Creates a new purchase asynchronously.
        /// </summary>
        /// <param name="purchases"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task CreatePurchase(Purchases purchases, CancellationToken cancellationToken);
        /// <summary>
        /// Gets a purchase by user ID asynchronously.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="userId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<(List<PurchaseDTO>, int TotalCount)> GetPurchasesByUserIdAsync(int page, int pageSize, int userId, CancellationToken cancellationToken);
        /// <summary>
        /// Updates an existing purchase asynchronously.
        /// </summary>
        /// <param name="purchases"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task UpdatePurchase(Purchases purchases, CancellationToken cancellationToken);
        /// <summary>
        /// Deletes a purchase asynchronously.
        /// </summary>
        /// <param name="purchases"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeletePurchase(Purchases purchases, CancellationToken cancellationToken);
        /// <summary>
        /// Saves changes to the database asynchronously.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
