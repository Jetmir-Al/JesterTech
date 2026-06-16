using JesterTech.Server.Data;
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

        public void CreatePurchase(Purchases purchases)
        {
            _context.Add(purchases);
            Save();
        }

        public void DeletePurchase(Purchases purchases)
        {
            if (purchases != null)
            {
                _context.Remove(purchases);
                Save();
            }
        }

        public List<Purchases> GetAll()
        {
           return _context.Purchases.ToList();
        }
        public void UpdatePurchase(Purchases purchases)
        {
            _context.Update(purchases);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
            
        public List<Purchases> GetPurchasesByUserId(int userId)
        {
            return _context.Purchases
                .Include(p => p.User)
                .Include(p => p.Product)
                .Where(p => p.UserId == userId)
                .ToList();
        }
    }
}
