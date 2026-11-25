using JesterTech.Server.Common.DTO;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JesterTech.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AiController(IAiService aiService) : ControllerBase
    {


        [HttpPost("ask")]
        public async Task<IActionResult> AskProductAi([FromBody] AiQuestionDTO dto, CancellationToken cancellationToken)
        {
            var answer = await aiService.AskAiForProductAsync(dto, cancellationToken);
            return Ok(new { answer });
        }

        [HttpPost("ask-general")]
        public async Task<IActionResult> AskGlobalAi([FromBody] GeneralQuestionDTO dto, CancellationToken cancellationToken)
        {
            var answer = await aiService.AskAiForAllProductsAsync(dto, cancellationToken);
            return Ok(new { answer });
        }
        [Authorize]
        [HttpPost("ask-purchases")]
        public async Task<IActionResult> AskPurchasesAi([FromBody] GeneralQuestionDTO dto, CancellationToken cancellationToken)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var answer = await aiService.AskAiForPurchasesAsync(userId, dto, cancellationToken);
            return Ok(new { answer });
        }

        [HttpPost("ask-AiCompare")]
        public async Task<IActionResult> AskCompareAi([FromBody] CompareAiQuestionDTO dto, CancellationToken cancellationToken)
        {

            if (dto.ProductIds == null || dto.ProductIds.Count < 2)
            {
                return BadRequest(new { message = "Chose at least two products for comparison." });
            }

            var answer = await aiService.AskAiToCompareProductsAsync(dto, cancellationToken);
            return Ok(new { answer });
        }
    }
}