using JesterTech.Server.Data;
using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public void CreateProduct(Products product)
        {
            _context.Products.Add(product);
        }

        public void DeleteProduct(Products product)
        {
            if (product != null)
            {
                _context.Products.Remove(product);
                Save();
            }
        }

        public List<Products> GetAllProducts()
        {
             return _context.Products.ToList();
        }

        public Products GetProductById(int id)
        {
            return _context.Products.FirstOrDefault(p => p.Id == id);
        }

        public void UpdateProduct(Products product)
        {
            _context.Products.Update(product);
            Save();
        }
        public void Save()
        {
             _context.SaveChanges();
        }

    }
}
