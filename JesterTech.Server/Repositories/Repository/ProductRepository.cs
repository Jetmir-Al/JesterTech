using JesterTech.Server.Data;
using JesterTech.Server.DTO;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories.Interfaces;
using LinqKit;
using Microsoft.EntityFrameworkCore;

namespace JesterTech.Server.Repositories.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        /// <inheritdoc />
        public async Task CreateProduct(Products product, CancellationToken cancellationToken)
        {
            await _context.Products.AddAsync(product, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task DeleteProduct(int productId, CancellationToken cancellationToken)
        {
                await _context.Products
                    .Where(data => data.Id == productId)
                    .ExecuteDeleteAsync(cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductsDTO>> GetAllProducts(CancellationToken cancellationToken)
        {

            return await _context.Products
                .AsNoTracking()
                .Select(p => new ProductsDTO
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

                    AverageRating =
                    _context.Reviews
                        .Where(r => r.ProductId == p.Id).Any()
                        ? _context.Reviews
                        .Where(r => r.ProductId == p.Id).Average(r => r.Rating)
                        : 0
                }).ToListAsync(cancellationToken);

        }
        /// <inheritdoc />
        public async Task<ProductsDTO> GetProductById(int id, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
            if (product == null) return null;

            return new ProductsDTO
            {
                Id = product.Id,
                Title = product.Title,
                Brand = product.Brand,
                Garantee = product.Garantee,
                Price = product.Price,
                Quantity = product.Quantity,
                Category = product.Category,
                Image = product.Image,
                AverageRating = _context.Reviews
                    .Where(r => r.ProductId == product.Id).Any()
                    ? _context.Reviews
                    .Where(r => r.ProductId == product.Id).Average(r => r.Rating)
                    : 0
            };
        }
        /// <inheritdoc />
        public async Task UpdateProduct(int Id, Products product, CancellationToken cancellationToken)
        {
            await _context.Products
                .Where(data => data.Id == Id)
                .ExecuteUpdateAsync(p =>
                {
                    p.SetProperty(b => b.Title, product.Title);
                    p.SetProperty(b => b.Specifications, product.Specifications);
                    p.SetProperty(b => b.Brand, product.Brand);
                    p.SetProperty(b => b.Category, product.Category);
                    p.SetProperty(b => b.Price, product.Price);
                    p.SetProperty(b => b.Quantity, product.Quantity);
                    if(product.Image != null)
                    {
                        p.SetProperty(b => b.Image, product.Image);
                    }
                }, cancellationToken);
            await SaveAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<string>> GetAllCategories(CancellationToken cancellationToken)
        {
            return await _context.Products
                .Select(p => p.Category)
                .Distinct()
                .ToListAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<string>> GetAllBrands(CancellationToken cancellationToken)
        {
            return await _context.Products
                .Select(p => p.Brand)
                .Distinct()
                .ToListAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductsDTO>> GetFeaturedProducts(CancellationToken cancellationToken)
        {
            return await _context.Products
                .AsNoTracking()
                .GroupJoin(
                    _context.Reviews,
                    p => p.Id,
                    r => r.ProductId,
                    (p, reviews) => new
                    {
                        Product = p,
                        AverageRating = reviews.Any() ? reviews.Average(r => (double)r.Rating) : 0
                    }
                )
                .OrderByDescending(x => x.AverageRating)
                .Take(8)
                .Select(x => new ProductsDTO
                {
                    Id = x.Product.Id,
                    Title = x.Product.Title,
                    Brand = x.Product.Brand,
                    Garantee = x.Product.Garantee,
                    Price = x.Product.Price,
                    Quantity = x.Product.Quantity,
                    Category = x.Product.Category,
                    Image = x.Product.Image,
                    AverageRating = x.AverageRating
                })
                .ToListAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<(List<AdvancedProductDto>, int TotalCount)> GetProductsPagination(int page, int pageSize, ExpressionStarter<Products> predicate, string? sort, CancellationToken cancellationToken)
        {
            var total = await _context.Products
                .AsNoTracking()
                .Where(predicate)
                .CountAsync(cancellationToken);

            var query = _context.Products
                .AsNoTracking()
                .Where(predicate);

            query = sort switch
            {
                "price" => query.OrderBy(p => p.Price),
                "name" => query.OrderByDescending(p => p.Title),
                "new" => query.OrderByDescending(p => p.Id),
                "old" => query.OrderBy(p => p.Id),
                _ => query
            };

            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new AdvancedProductDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Price = p.Price,
                    Image = p.Image,
                    AverageRating = _context.Reviews
                        .Where(r => r.ProductId == p.Id).Any()
                        ? _context.Reviews
                        .Where(r => r.ProductId == p.Id).Average(r => r.Rating)
                        : 0
                })
                .ToListAsync(cancellationToken);
            return (products, total);
        }
        /// <inheritdoc />
        public async Task<List<TopProducts>> GetTopProducts(CancellationToken cancellationToken)
        {
            return await _context.Products
                .AsNoTracking()
                .Where(p => p.Category == "Smartphones")
                .OrderByDescending(p => p.Id)
                .Select(p => new TopProducts(p.Image))
                .Take(3)
                .ToListAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task UpdateProductImg(int id, string ImgFile, CancellationToken cancellationToken)
        {
            await _context.Products
                .Where(p => p.Id == id)
                .ExecuteUpdateAsync(p => 
                    p.SetProperty(p => p.Image, ImgFile), 
                    cancellationToken);
        }
        /// <inheritdoc />
        public async Task<Products> GetProductByIdForAi(int productId, CancellationToken cancellationToken)
        {
            return await _context.Products
                    .FirstOrDefaultAsync(p => p.Id == productId, 
                    cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductByCategoryResponseDTO>> GetProductsByCategory(string category, CancellationToken cancellationToken)
        {
            return await _context.Products
                .AsNoTracking()
                .Where(p => p.Category == category)
                .Select(p => new ProductByCategoryResponseDTO(p.Id, p.Title, p.Brand, p.Garantee, p.Price, p.Quantity, p.Category, p.Specifications, p.Image))
                .ToListAsync(cancellationToken);
        }
        /// <inheritdoc />
        public async Task<List<ProductsDTO>> GetAllProductsForAi(CancellationToken cancellationToken)
        {
            return await _context.Products
                .AsNoTracking()
                .Select(p => new ProductsDTO 
                {
                    Title = p.Title,
                    Brand = p.Brand,
                    Garantee = p.Garantee,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Category = p.Category,
                    Specifications = p.Specifications,
                    AverageRating = _context.Reviews
                        .Where(r => r.ProductId == p.Id).Any()
                        ? _context.Reviews
                        .Where(r => r.ProductId == p.Id).Average(r => r.Rating)
                        : 0
                })
                .ToListAsync(cancellationToken);
        }
        public async Task<bool> ReduceProductStock(int productId, int quantity, CancellationToken cancellationToken)
        {
            int rowsAffected = await _context.Products
                .Where(p => p.Id == productId && p.Quantity >= quantity)
                .ExecuteUpdateAsync(p => 
                    p.SetProperty(p => p.Quantity, 
                                  p => p.Quantity - quantity), 
                                  cancellationToken);
            
            return rowsAffected > 0;
        }

        public async Task<(List<ProductsDTO>, int TotalCount)> GetProductsDashboardPagination(int page, int pageSize, ExpressionStarter<Products> predicate, CancellationToken cancellationToken)
        {
            var total = await _context.Products
                .AsNoTracking()
                .Where(predicate)
                .CountAsync(cancellationToken);

            var query = _context.Products
                .AsNoTracking()
                .Where(predicate)
                .OrderByDescending(data => data.Id);

            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductsDTO
                {
                    Id = p.Id,
                    Title = p.Title,
                    Price = p.Price,
                    Brand = p.Brand,
                    Category = p.Category,
                    Garantee = p.Garantee,
                    Quantity = p.Quantity,
                    Specifications = p.Specifications,
                    Image = p.Image,
                    AverageRating = _context.Reviews
                        .Where(r => r.ProductId == p.Id).Any()
                        ? _context.Reviews
                        .Where(r => r.ProductId == p.Id).Average(r => r.Rating)
                        : 0
                })
                .ToListAsync(cancellationToken);
            return (products, total);
        }
    }
}
