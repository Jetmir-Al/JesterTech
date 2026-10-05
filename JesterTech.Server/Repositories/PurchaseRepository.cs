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

        public async Task CreatePurchase(Purchases purchases)
        {
            _context.Add(purchases);
            await SaveAsync();
        }

        public async Task DeletePurchase(Purchases purchases)
        {
            if (purchases != null)
            {
                _context.Remove(purchases);
                await SaveAsync();
            }
        }

        public async Task<List<Purchases>> GetAllAsync()
        {
            return await _context.Purchases.AsNoTracking().ToListAsync();
        }

        public async Task UpdatePurchase(Purchases purchases)
        {
            _context.Update(purchases);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<PurchaseDTO>> GetPurchasesByUserIdAsync(int page, int pageSize, int userId)
        {
            return await _context.Purchases
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
                .ToListAsync();
        }
    }
}
