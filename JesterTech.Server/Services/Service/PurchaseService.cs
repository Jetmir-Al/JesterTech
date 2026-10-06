using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories;
using JesterTech.Server.Services.Interfaces;

namespace JesterTech.Server.Services.Service
{
    public class PurchaseService(
        IPurchaseRepository _purchaseRepository, 
        IProductRepository _productRepository) : IPurchaseService
    {
        public async Task CreatePurchaseById(int productId, CreatePurchaseDto createPurchaseDto, int userId, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetProductById(productId, cancellationToken);
            if (product == null)
                return;

            if (product.Quantity < createPurchaseDto.Quantity)
                return;

            product.Quantity -= createPurchaseDto.Quantity;
            await _productRepository.SaveAsync(cancellationToken);

            var purchase = new Purchases
            {
                ProductId = productId,
                UserId = userId,
                Quantity = createPurchaseDto.Quantity,
                Address = createPurchaseDto.Address,
                CardholderName = createPurchaseDto.CardholderName,
                CardNumber = createPurchaseDto.CardNumber.Length >= 4 ? createPurchaseDto.CardNumber[^4..] : createPurchaseDto.CardNumber,
                PurchaseDate = createPurchaseDto.PurchaseDate
            };
            await _purchaseRepository.CreatePurchase(purchase, cancellationToken);
        }

        public Task<List<PurchaseAiDTO>> GetPurchaseAiAsync(int userId, CancellationToken cancellationToken)
        {
            var result = _purchaseRepository.GetPurchaseAiByUserIdAsync(userId, cancellationToken);
            return result;
        }

        public async Task<PurchasePaginationDTO> GetPurchasesAsync(int pageNumber, int pageSize, int userId, CancellationToken cancellationToken)
        {
            var (purchases, totalCount) = await _purchaseRepository.GetPurchasesByUserIdAsync(pageNumber, pageSize, userId, cancellationToken);

            return new PurchasePaginationDTO
            {
                TotalCount = totalCount,
                Page = pageNumber,
                PageSize = pageSize,
                Purchases = purchases
            };
        }
    }
}
