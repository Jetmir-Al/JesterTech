using JesterTech.Server.DTO;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IPurchaseService
    {
        /// <summary>
        /// Creates a purchase for a product by its ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="createPurchaseDto"></param>
        /// <param name="userId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task CreatePurchaseById(int productId, CreatePurchaseDto createPurchaseDto, int userId, CancellationToken cancellationToken);
        /// <summary>
        /// Gets a paginated list of purchases.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="userId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<PurchasePaginationDTO> GetPurchasesAsync(int pageNumber, int pageSize, int userId, CancellationToken cancellationToken);

        /// <summary>
        /// Gets a purchase by userId.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<PurchaseAiDTO>> GetPurchaseAiAsync(int userId, CancellationToken cancellationToken);
    }
}
