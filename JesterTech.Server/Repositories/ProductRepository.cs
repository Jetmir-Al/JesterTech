using JesterTech.Server.Data;
using JesterTech.Server.Models;
using Microsoft.EntityFrameworkCore;

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
            try
            {
                return _context.Products.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occurred while fetching products: " + ex.Message);
                return new List<Products>();
            }
            
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
