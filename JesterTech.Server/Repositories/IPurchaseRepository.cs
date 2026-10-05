using JesterTech.Server.DTO;
using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IPurchaseRepository
    {
        Task<List<Purchases>> GetAllAsync();  
        Task CreatePurchase(Purchases purchases);
        Task<List<PurchaseDTO>> GetPurchasesByUserIdAsync(int page, int pageSize, int userId);
        Task UpdatePurchase(Purchases purchases);
        Task DeletePurchase(Purchases purchases);
        Task SaveAsync();
    }
}
