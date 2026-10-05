using JesterTech.Server.Data;
using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace JesterTech.Server.Repositories
{
    public class PurchaseRepository: IPurchaseRepository
    {
        private readonly ApplicationDbContext _context;
        public PurchaseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreatePurchase(Purchases purchases, CancellationToken cancellationToken)
        {
            await _context.AddAsync(purchases, cancellationToken);
            await SaveAsync(cancellationToken);
        }

        public async Task DeletePurchase(Purchases purchases, CancellationToken cancellationToken)
        {
            if (purchases != null)
            {
                _context.Remove(purchases);
                await SaveAsync(cancellationToken);
            }
        }

        public async Task<List<Purchases>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.Purchases.AsNoTracking().ToListAsync(cancellationToken);
        }

        public async Task UpdatePurchase(Purchases purchases, CancellationToken cancellationToken)
        {
            _context.Update(purchases);
            await SaveAsync(cancellationToken);
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<(List<PurchaseDTO>, int TotalCount)> GetPurchasesByUserIdAsync(int page, int pageSize, int userId, CancellationToken cancellationToken)
        {
            var total = await _context.Purchases
                .Where(p => p.UserId == userId)
                .CountAsync(cancellationToken);

            var purchases = await _context.Purchases
                .Include(p => p.User)
                .Include(p => p.Product)
                .Where(p => p.UserId == userId)
                .AsNoTracking()
                .Select(p => new PurchaseDTO
                {
                    Id = p.Id,
                    UserName = p.User.Name,
                    ProductTitle = p.Product.Title,
                    Quantity = p.Quantity,
                    Total = p.Total,
                    Address = p.Address,
                    PurchaseDate = p.PurchaseDate,
                    CardholderName = p.CardholderName,
                    MaskedCardNumber = "**** **** **** " + p.CardNumber,
                    Image = p.Product.Image
                })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return (purchases, total);
        }
    }
}
