using JesterTech.Server.Data;
using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace JesterTech.Server.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
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

        public IQueryable<ProductsDTO> GetAllProducts()
        {
            try
            {
                return _context.Products.Select(p => new ProductsDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Specifications = p.Specifications,
                    Brand = p.Brand,
                    Garantee = p.Garantee,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Category = p.Category,
                    Image = p.Image,

                    AverageRating = _context.Reviews.Where(r => r.ProductId == p.Id).Any()
                ? _context.Reviews.Where(r => r.ProductId == p.Id).Average(r => r.Rating)
                : 0

                }).AsQueryable();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occurred while fetching products: " + ex.Message);
                return new List<ProductsDTO>().AsQueryable();
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
