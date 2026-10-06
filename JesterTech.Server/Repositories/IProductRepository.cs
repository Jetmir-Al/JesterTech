using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using LinqKit;

namespace JesterTech.Server.Repositories
{
    public interface IProductRepository
    {
        /// <summary>
        /// Gets all products from the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<ProductsDTO>> GetAllProducts(CancellationToken cancellationToken);
        /// <summary>
        /// Gets all categories from the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<string>> GetAllCategories(CancellationToken cancellationToken);
        /// <summary>
        /// Gets all brands from the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<string>> GetAllBrands(CancellationToken cancellationToken);
        /// <summary>
        /// Gets a product by its ID from the database for AI purposes.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<Products> GetProductByIdForAi(int productId, CancellationToken cancellationToken);
        /// <summary>
        /// Gets the top products from the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<ProductDTO>> GetTopProducts(CancellationToken cancellationToken);
        /// <summary>
        /// Gets the featured products from the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<List<ProductsDTO>> GetFeaturedProducts(CancellationToken cancellationToken);
        /// <summary>
        /// Gets the products with pagination from the database.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="predicate"></param>
        /// <param name="sort"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<(List<ProductsDTO>, int TotalCount)> GetProductsPagination(int page, int pageSize, ExpressionStarter<Products> predicate, string? sort, CancellationToken cancellationToken);
        /// <summary>
        /// Gets a product by its ID from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<ProductsDTO> GetProductById(int id, CancellationToken cancellationToken);
        /// <summary>
        /// Creates a new product in the database.
        /// </summary>
        /// <param name="product"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task CreateProduct(Products product, CancellationToken cancellationToken);
        /// <summary>
        /// Updates an existing product in the database.
        /// </summary>
        /// <param name="product"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task UpdateProduct(Products product, CancellationToken cancellationToken);
        /// <summary>
        /// Updates the image of an existing product in the database.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ImgFile"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task UpdateProductImg(int id, string ImgFile, CancellationToken cancellationToken);
        /// <summary>
        /// Deletes a product by its ID from the database.
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task DeleteProduct(int productId, CancellationToken cancellationToken);
        /// <summary>
        /// Saves changes to the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
