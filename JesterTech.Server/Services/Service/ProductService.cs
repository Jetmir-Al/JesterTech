using JesterTech.Server.DTO;
using JesterTech.Server.Services.Interfaces;

namespace JesterTech.Server.Services.Service
{
    public class ProductService : IProductService
    {
        public Task CreateProduct(InsertProductDTO productDTO)
        {
            throw new NotImplementedException();
        }

        public Task DeleteProductById(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductDTO>> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductDTO>> GetFeaturedProducts()
        {
            throw new NotImplementedException();
        }

        public Task<ProductDTO> GetProductById(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<List<string>> GetProductCategories()
        {
            throw new NotImplementedException();
        }

        public Task<ProductPaginationDTO> GetProductsPagination(int page, int pageSize, string? search, List<string>? categories, string? sort)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductDTO>> GetTopProducts()
        {
            throw new NotImplementedException();
        }

        public Task UpdateProductImg(int Id, UpdateProductDTO productDTO)
        {
            throw new NotImplementedException();
        }
    }
}
