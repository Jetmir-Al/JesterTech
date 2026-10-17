using JesterTech.Server.DTO;

namespace JesterTech.Server.Services.Interfaces
{
    public interface IAiService
    {
        /// <summary>
        /// Ask Ai for a specific product.
        /// </summary>
        /// <param name="requestDto"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<string> AskAiForProductAsync(AiQuestionDTO requestDto, CancellationToken cancellationToken);
        /// <summary>
        /// Ask Ai for all products
        /// </summary>
        /// <param name="requestDto"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<string> AskAiForAllProductsAsync(GeneralQuestionDTO requestDto, CancellationToken cancellationToken);
        /// <summary>
        /// Ask Ai for purchases
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="requestDto"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<string> AskAiForPurchasesAsync(int UserId, GeneralQuestionDTO requestDto, CancellationToken cancellationToken);
        /// <summary>
        /// Ask the AI to compare products based on the provided question and product IDs.
        /// </summary>
        /// <param name="requestDto"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<string> AskAiToCompareProductsAsync(CompareAiQuestionDTO requestDto, CancellationToken cancellationToken);
    }
}
