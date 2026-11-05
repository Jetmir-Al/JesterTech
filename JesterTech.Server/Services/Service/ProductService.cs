using JesterTech.Server.DTO;
using JesterTech.Server.Helpers;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories.Interfaces;
using JesterTech.Server.Services.Interfaces;
using LinqKit;

namespace JesterTech.Server.Services.Service
{
    public class ProductService(
        IProductRepository _productRepository,
        IWebHostEnvironment _webHostEnvironment
        ) : IProductService
    {
        /// <inheritdoc />
        public async Task CreateProduct(InsertProductDTO productDTO, CancellationToken cancellationToken)
        {
            var product = new Products
            {
                Title = productDTO.Title,
                Brand = productDTO.Brand,
                Garantee = productDTO.Garantee,
                Price = productDTO.Price,
                Quantity = productDTO.Quantity,
                Category = productDTO.Category,
                Specifications = productDTO.Specifications,
            };

            if (productDTO.ImgFile != null && productDTO.ImgFile.Length > 0)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                Directory.CreateDirectory(uploadsFolder);

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + productDTO.ImgFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    productDTO.ImgFile.CopyTo(fileStream);
                }


                product.Image = "/images/" + uniqueFileName;
            }

            await _productRepository.CreateProduct(product, cancellationToken);
        }
        /// <inheritdoc />
        public async Task DeleteProductById(int productId, CancellationToken cancellationToken)
        {
            await _productRepository.DeleteProduct(productId, cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductsDTO>> GetAllProducts(CancellationToken cancellationToken)
        {
            return await _productRepository.GetAllProducts(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductsDTO>> GetFeaturedProducts(CancellationToken cancellationToken)
        {
            return await _productRepository.GetFeaturedProducts(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<ProductsDTO> GetProductById(int productId, CancellationToken cancellationToken)
        {
            return await _productRepository.GetProductById(productId, cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<string>> GetProductCategories(CancellationToken cancellationToken)
        {
            return await _productRepository.GetAllCategories(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<string>> GetProductBrands(CancellationToken cancellationToken)
        {
            return await _productRepository.GetAllBrands(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<ProductPaginationDTO> GetProductsPagination(int page, int pageSize, string? search, List<string>? categories, string? sort, CancellationToken cancellationToken)
        {
            var filter = new FilterBuilder<Products>();

            filter.AddFilter(data => data.Title.Contains(search) || data.Brand.Contains(search), !string.IsNullOrEmpty(search));
            filter.AddFilter(data => categories.Contains(data.Category), categories != null && categories.Count > 0);
           

            var predicate = filter.Build();
            var (products, totalCount) = await _productRepository.GetProductsPagination(page, pageSize, predicate, sort, cancellationToken);
            return new ProductPaginationDTO
            {
                Page = page,
                PageSize = pageSize,
                Products = products,
                TotalCount = totalCount
            };    
        }
        /// <inheritdoc />
        public async Task<List<TopProducts>> GetTopProducts(CancellationToken cancellationToken)
        {
            return await _productRepository.GetTopProducts(cancellationToken);
        }
        /// <inheritdoc />
        public async Task UpdateProductImg(int Id, UpdateProductImgDTO productDTO, CancellationToken cancellationToken)
        {
            if (productDTO.ImgFile != null && productDTO.ImgFile.Length > 0)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                Directory.CreateDirectory(uploadsFolder);

                var currentImgPath = await _productRepository.GetProductById(Id, cancellationToken);

                if (currentImgPath?.Image != null)
                {
                    string currentFilePath = Path.Combine(_webHostEnvironment.WebRootPath, currentImgPath.Image.TrimStart('/'));
                    if (File.Exists(currentFilePath))
                    {
                        File.Delete(currentFilePath);
                    }
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + productDTO.ImgFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await productDTO.ImgFile.CopyToAsync(fileStream, cancellationToken);
                }

                await _productRepository.UpdateProductImg(Id, "/images/" + uniqueFileName, cancellationToken);
            }
        }
        /// <inheritdoc />
        public async Task<Products> GetProductByIdForAi(int productId, CancellationToken cancellationToken)
        {
            return await _productRepository.GetProductByIdForAi(productId, cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductByCategoryResponseDTO>> GetProductsByCategory(string category, CancellationToken cancellationToken)
        {
            return await _productRepository.GetProductsByCategory(category, cancellationToken);
        }
        /// <inheritdoc />
        public async Task UpdateProduct(int Id, UpdateProductDTO productDTO, CancellationToken cancellationToken)
        {
            var product = new Products
            {
                Title = productDTO.Title,
                Brand = productDTO.Brand,
                Garantee = productDTO.Garantee,
                Price = productDTO.Price,
                Quantity = productDTO.Quantity,
                Category = productDTO.Category,
                Specifications = productDTO.Specifications,
            };

            if (productDTO.ImgFile != null && productDTO.ImgFile.Length > 0)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                Directory.CreateDirectory(uploadsFolder);
                var currentImgPath = await _productRepository.GetProductById(Id, cancellationToken);

                if (currentImgPath?.Image != null)
                {
                    string currentFilePath = Path.Combine(_webHostEnvironment.WebRootPath, currentImgPath.Image.TrimStart('/'));
                    if (File.Exists(currentFilePath))
                    {
                        File.Delete(currentFilePath);
                    }
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + productDTO.ImgFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);


                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await productDTO.ImgFile.CopyToAsync(fileStream, cancellationToken);
                }


                product.Image = "/images/" + uniqueFileName;
            }

            await _productRepository.UpdateProduct(Id, product, cancellationToken);
        }
        /// <inheritdoc />
        public async Task<AdminProductsPaginationDTO> GetProductsDashboardPagination(int page, int pageSize, string? search, CancellationToken cancellationToken)
        {
            var filter = new FilterBuilder<Products>();

            filter.AddFilter(data => data.Title.Contains(search) || data.Brand.Contains(search), !string.IsNullOrEmpty(search));


            var predicate = filter.Build();
            var (products, totalCount) = await _productRepository.GetProductsDashboardPagination(page, pageSize, predicate, cancellationToken);
            return new AdminProductsPaginationDTO
            {
                Page = page,
                PageSize = pageSize,
                Products = products,
                TotalCount = totalCount
            };
        }
    }
}
