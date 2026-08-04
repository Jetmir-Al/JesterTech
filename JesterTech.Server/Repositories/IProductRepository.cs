using JesterTech.Server.DTO;
using JesterTech.Server.Models;

namespace JesterTech.Server.Repositories
{
    public interface IProductRepository
    {
        IQueryable<ProductsDTO> GetAllProducts();
        Products GetProductById(int id);
        void CreateProduct(Products product);
        void UpdateProduct(Products product);
        void DeleteProduct(Products product);
        void Save();
    }
}
