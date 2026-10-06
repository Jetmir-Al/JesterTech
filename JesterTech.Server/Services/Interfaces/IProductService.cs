using JesterTech.Server.DTO;
using JesterTech.Server.Models;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IProductService
    {
        /// <summary>
        /// Gets a list of all products.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<ProductsDTO>> GetAllProducts(CancellationToken cancellationToken);
        /// <summary>
        /// Gets a list of products filtered by the specified category.
        /// </summary>
        /// <param name="category"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<ProductsDTO>> GetProductsByCategory(string category, CancellationToken cancellationToken);)
        /// <summary>
        /// Gets a list of all product categories.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<string>> GetProductCategories(CancellationToken cancellationToken);
        /// <summary>
        /// Gets a list of all product brands.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<string>> GetProductBrands(CancellationToken cancellationToken);

        /// <summary>
        /// Gets a product by its ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<ProductsDTO> GetProductById(int productId, CancellationToken cancellationToken);
        /// <summary>
        /// Gets a product by its ID for AI purposes.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<Products> GetProductByIdForAi(int productId, CancellationToken cancellationToken);
        /// <summary>
        /// Gets a list of featured products.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<ProductsDTO>> GetFeaturedProducts(CancellationToken cancellationToken);

        /// <summary>
        /// Gets a paginated list of products based on the provided parameters.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="search"></param>
        /// <param name="categories"></param>
        /// <param name="sort"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<ProductPaginationDTO> GetProductsPagination(int page, int pageSize, string? search, List<string>? categories, string? sort, CancellationToken cancellationToken);
        /// <summary>
        /// Gets a list of top 3 products.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<TopProducts>> GetTopProducts(CancellationToken cancellationToken);

        /// <summary>
        /// Creates a new product based on the provided InsertProductDTO.
        /// </summary>
        /// <param name="productDTO"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task CreateProduct(InsertProductDTO productDTO, CancellationToken cancellationToken);
        /// <summary>
        /// Updates the image of a product based on the provided ID and UpdateProductDTO.
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="productDTO"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task UpdateProductImg(int Id, UpdateProductDTO productDTO, CancellationToken cancellationToken);

        /// <summary>
        /// Deletes a product by its ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteProductById(int productId, CancellationToken cancellationToken);
    }
}
