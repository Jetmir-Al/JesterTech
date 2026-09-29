using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;

namespace JesterTech.Server.Services.Service
{
    public class PurchaseService : IPurchaseService
    {
        public Task CreateProductById(int productId, CreatePurchaseDto createPurchaseDto)
        {
            throw new NotImplementedException();
        }

        public Task<PurchasePaginationDTO> GetPurchasesAsync(int pageNumber, int pageSize)
        {
            throw new NotImplementedException();
        }
    }
}
