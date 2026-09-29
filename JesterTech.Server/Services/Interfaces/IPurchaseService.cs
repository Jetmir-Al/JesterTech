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
        /// <returns></returns>
        Task CreateProductById(int productId, CreatePurchaseDto createPurchaseDto);
        /// <summary>
        /// Gets a paginated list of purchases.
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        Task<PurchasePaginationDTO> GetPurchasesAsync(int pageNumber, int pageSize);
    }
}
