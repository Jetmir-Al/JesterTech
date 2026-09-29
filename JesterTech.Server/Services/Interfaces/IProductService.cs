using JesterTech.Server.DTO;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IProductService
    {
        /// <summary>
        /// Gets a list of all products.
        /// </summary>
        /// <returns></returns>
        Task<List<ProductDTO>> GetAllProducts();
        /// <summary>
        /// Gets a list of all product categories.
        /// </summary>
        /// <returns></returns>
        Task<List<string>> GetProductCategories();

        /// <summary>
        /// Gets a product by its ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task<ProductDTO> GetProductById(int productId);
        /// <summary>
        /// Gets a list of featured products.
        /// </summary>
        /// <returns></returns>
        Task<List<ProductDTO>> GetFeaturedProducts();

        /// <summary>
        /// Gets a paginated list of products based on the provided parameters.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <param name="search"></param>
        /// <param name="categories"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        Task<ProductPaginationDTO> GetProductsPagination(int page, int pageSize, string? search, List<string>? categories, string? sort);
        /// <summary>
        /// Gets a list of top 3 products.
        /// </summary>
        /// <returns></returns>
        Task<List<ProductDTO>> GetTopProducts();

        /// <summary>
        /// Creates a new product based on the provided InsertProductDTO.
        /// </summary>
        /// <param name="productDTO"></param>
        /// <returns></returns>
        Task CreateProduct(InsertProductDTO productDTO);
        /// <summary>
        /// Updates the image of a product based on the provided ID and UpdateProductDTO.
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="productDTO"></param>
        /// <returns></returns>
        Task UpdateProductImg(int Id, UpdateProductDTO productDTO);

        /// <summary>
        /// Deletes a product by its ID.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task DeleteProductById(int productId);
    }
}
