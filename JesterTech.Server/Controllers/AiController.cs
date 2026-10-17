using JesterTech.Server.DTO;
using JesterTech.Server.HttpClients;
using JesterTech.Server.Models;
using JesterTech.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;

namespace JesterTech.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AiController(IAiService aiService) : ControllerBase
    {


        [HttpPost("ask")]
        public async Task<IActionResult> AskProductAi([FromBody] AiQuestionDTO dto, CancellationToken cancellationToken)
        {
            try
            {
                var answer = await aiService.AskAiForProductAsync(dto, cancellationToken);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("ask-general")]
        public async Task<IActionResult> AskGlobalAi([FromBody] GeneralQuestionDTO dto, CancellationToken cancellationToken)
        {
            try
            {
                var answer = await aiService.AskAiForAllProductsAsync(dto, cancellationToken);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize]
        [HttpPost("ask-purchases")]
        public async Task<IActionResult> AskPurchasesAi([FromBody] GeneralQuestionDTO dto, CancellationToken cancellationToken)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim);

            try
            {
                var answer = await aiService.AskAiForPurchasesAsync(userId, dto, cancellationToken);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("ask-AiCompare")]
        public async Task<IActionResult> AskCompareAi([FromBody] CompareAiQuestionDTO dto, CancellationToken cancellationToken)
        {

            if (dto.ProductIds == null || dto.ProductIds.Count < 2)
            {
                return BadRequest(new { message = "Chose at least two products for comparison." });
            }

            try
            {
                var answer = await aiService.AskAiToCompareProductsAsync(dto, cancellationToken);
                return Ok(new { answer });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}