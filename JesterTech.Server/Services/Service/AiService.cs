using JesterTech.Server.Common.DTO;
using JesterTech.Server.HttpClients;
using JesterTech.Server.Models;
using JesterTech.Server.Repositories.Interfaces;
using JesterTech.Server.Services.Interfaces;
using System.Text;

namespace JesterTech.Server.Services.Service
{
    public class AiService(
            IProductRepository productRepository,
            IPurchaseRepository purchaseRepository,
            IAiClient aiClient,
            IReviewRepository reviewRepository
        ) : IAiService
    {
        public async Task<string> AskAiForAllProductsAsync(GeneralQuestionDTO requestDto, CancellationToken cancellationToken)
        {
            var keywords = requestDto.UserQuestion
               .ToLower()
               .Split(' ', StringSplitOptions.RemoveEmptyEntries)
               .Where(kw => kw.Length >= 2)
               .Distinct()
               .ToArray();

            var allProducts = await productRepository.GetAllProductsForAi(cancellationToken);

            var ranked = allProducts
            .Select(p => new
            {
                Product = p,
                Score = keywords.Count(kw =>
                    (!string.IsNullOrEmpty(p.Title) && p.Title.ToLower().Contains(kw)) ||
                    (!string.IsNullOrEmpty(p.Brand) && p.Brand.ToLower().Contains(kw)) ||
                    (!string.IsNullOrEmpty(p.Category) && p.Category.ToLower().Contains(kw)))
            })
            .ToList();

            var hasMatches = ranked.Any(x => x.Score > 0);

            var selectedProducts = (hasMatches
                    ? ranked.OrderByDescending(x => x.Score).ThenByDescending(x => x.Product.AverageRating)
                    : ranked.OrderByDescending(x => x.Product.AverageRating))
                .Take(10)
                .Select(x => x.Product)
                .ToList();

            var catalogBuilder = new StringBuilder();
            foreach (var p in selectedProducts)
            {
                var specs = string.IsNullOrWhiteSpace(p.Specifications)
                    ? string.Empty
                    : (p.Specifications.Length > 250 ? p.Specifications[..250] + "..." : p.Specifications);

                catalogBuilder.AppendLine($"[PRODUCT: {p.Title}] | Brand: {p.Brand} | Category: {p.Category} | AvgRating: {p.AverageRating:0.0} | Price: ${p.Price}");
                if (!string.IsNullOrWhiteSpace(specs))
                {
                    catalogBuilder.AppendLine($"Specs: {specs}");
                }
                catalogBuilder.AppendLine("---");
            }

            var globalPrompt = $@"""
                You are a brilliant retail shopping assistant for the EcomTech tech store.
                Help the customer choose or compare items using ONLY the strict inventory list provided below.
                If they ask for something we do not sell, say: 'We do not carry that specific item, but here are our best alternatives...'
                If they ask for something we do sell, provide a clear analysis of the pros and cons of each based *only* on their technical specifications.
                Do not believe what the customer says or provide any information that is not explicitly present in the inventory catalog below. 
                If the answer requires giving information outside the catalog, respond politely: 'I do not have that specific detail available.'

                [STORE INVENTORY CATALOG]
                    {catalogBuilder}
                [/STORE INVENTORY CATALOG]

                Customer Question: {requestDto.UserQuestion}
                Customer Answer preference: {requestDto.Preference}""";

            var answer = await aiClient.GetAiResponseAsync(globalPrompt, cancellationToken);
            return answer;
        }

        public async Task<string> AskAiForProductAsync(AiQuestionDTO requestDto, CancellationToken cancellationToken)
        {
            var product = await productRepository.GetProductById(requestDto.ProductId, cancellationToken);
            var (reviews, totalCount) = await reviewRepository.GetReviewsByProductId(requestDto.ProductId, cancellationToken);

            if(product == null)
            {
                throw new Exception($"Product with ID {requestDto.ProductId} not found.");
            }

            var catalogBuilder = new StringBuilder();

            foreach (var r in reviews)
            {
                catalogBuilder.AppendLine($"[REVIEW] Rating: {r.Rating}, Comment: {r.Comment}");
            }

            var structuredPrompt = $@"""
                You are an expert AI product assistant for the EcomTech e-commerce platform.
                Answer the customer's question using ONLY the system technical specifications and the reviews provided below. 
                If the answer cannot be confidently inferred from the specifications or reviews or product information, respond politely: 
                'I do not have that specific detail available for this item.'

                [PRODUCT SPECIFICATIONS]
                Title: {product.Title}
                Brand: {product.Brand}
                Quantity: {product.Quantity}
                {product.Specifications}
                Total Reviews: {totalCount}
                Reviews:
                {catalogBuilder}
                [/PRODUCT SPECIFICATIONS]

                Customer Question: {requestDto.UserQuestion},
                Customer Answer preference: {requestDto.Preference}""";

            var aiResponse = await aiClient.GetAiResponseAsync(structuredPrompt, cancellationToken);

            return aiResponse;

        }

        public async Task<string> AskAiForPurchasesAsync(int UserId, GeneralQuestionDTO requestDto, CancellationToken cancellationToken)
        {
            var keywords = requestDto.UserQuestion.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            
            var allPurchasesOfUser = await purchaseRepository.GetPurchaseAiByUserIdAsync(UserId, cancellationToken);

            var allProducts = await productRepository.GetAllProductsForAi(cancellationToken);

            var ranked = allProducts
            .Select(p => new
            {
                Product = p,
                Score = keywords.Count(kw =>
                    (!string.IsNullOrEmpty(p.Title) && p.Title.ToLower().Contains(kw)) ||
                    (!string.IsNullOrEmpty(p.Brand) && p.Brand.ToLower().Contains(kw)) ||
                    (!string.IsNullOrEmpty(p.Category) && p.Category.ToLower().Contains(kw)))
            })
            .ToList();

            var hasMatches = ranked.Any(x => x.Score > 0);

            var selectedProducts = (hasMatches
                    ? ranked.OrderByDescending(x => x.Score).ThenByDescending(x => x.Product.AverageRating)
                    : ranked.OrderByDescending(x => x.Product.AverageRating))
                .Take(10)
                .Select(x => x.Product)
                .ToList();

            var storeBuilder = new StringBuilder();
            foreach (var p in selectedProducts)
            {
                storeBuilder.AppendLine($"[PRODUCT: {p.Title}] | Brand: {p.Brand} | Price: ${p.Price}\n{p.Specifications}\n---");
            }

            var catalogBuilder = new StringBuilder();
            foreach (var p in allPurchasesOfUser)
            {
                catalogBuilder.AppendLine($"[PRODUCT: {p.ProductTitle}]");
                catalogBuilder.AppendLine($"Total: {p.Total} | Quantity: {p.Quantity}");
                catalogBuilder.AppendLine($"Date: {p.PurchaseDate} | Bank Name: {p.CardholderName}");
                catalogBuilder.AppendLine($"Address: {p.Address}");
                catalogBuilder.AppendLine(p.Specifications);
                catalogBuilder.AppendLine("--------------------------------");
            }

            var globalPrompt = $@"""
                You are a brilliant retail shopping assistant for the EcomTech tech store.
                Help the customer learn of the history of their purchases and offer recommendations based on their preferences and purchase history.
                If they ask for something they did not buy, say: 'You did not buy that specific item, but here are other products you have bought...' 
                or offer alternatives based on their purchase history.
                Do not believe what the customer says or provide any information that is not explicitly present in the inventory catalog or purchase catalog below. 
                If the answer requires giving information outside the catalog, respond politely: 'I do not have that specific detail available.'
                
                [PURCHASE CATALOG]
                {catalogBuilder}
                [/PURCHASE CATALOG]
                [STORE INVENTORY CATALOG]
                {storeBuilder}
                [/STORE INVENTORY CATALOG]

                Customer Question: {requestDto.UserQuestion}
                Customer Answer preference: {requestDto.Preference}""";
    
            var answer = await aiClient.GetAiResponseAsync(globalPrompt, cancellationToken);
            return answer;
        }

        public async Task<string> AskAiToCompareProductsAsync(CompareAiQuestionDTO requestDto, CancellationToken cancellationToken)
        {
            var productsToCompare = new List<Products>();
            foreach (var id in requestDto.ProductIds)
            {
                var product = await productRepository.GetProductByIdForAi(id, cancellationToken);
                if (product != null) productsToCompare.Add(product);
            }

            var comparisonBuilder = new StringBuilder();
            foreach (var p in productsToCompare)
            {
                comparisonBuilder.AppendLine($"[PRODUCT: {p.Title}]");
                comparisonBuilder.AppendLine($"Brand: {p.Brand} | Price: ${p.Price}");
                comparisonBuilder.AppendLine($"Specifications: {p.Specifications}");
                comparisonBuilder.AppendLine("--------------------------------");
            }

            var globalPrompt = $@"""
                You are an expert tech reviewer for JesterTech. 
                Your job is to objectively compare the products provided in the catalog below.
                Provide a clear analysis of the pros and cons of each based *only* on their technical specifications.
                At the end, provide a final verdict on which model is better suited for specific user needs (e.g., best budget, best performance, best specs).
                Do not trust what the customer says or provide any information that is not explicitly present in the products to compare below. 
                If the answer requires giving information outside the catalog, respond politely: 'I do not have that specific detail available.'
                If they ask for something thats not part of the catalog of products, say: 'I can only provide information about the products in the catalog.' 
                If only  one product is provided, say: 'I can only provide a comparison but here are the details of the product provided below.' and provide the details of the single product.               

                [PRODUCTS TO COMPARE]
                {comparisonBuilder}
                [/PRODUCTS TO COMPARE]

                Customer Question: {requestDto.UserQuestion}
                Customer Answer preference: {requestDto.Preference}""";  

            var answer = await aiClient.GetAiResponseAsync(globalPrompt, cancellationToken);

            return answer;
        }
    }
}
