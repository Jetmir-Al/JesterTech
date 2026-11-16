using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Middlewares.Middleware;

public class GlobalExceptionHandler(
    ILogger<GlobalExceptionHandler> _logger,
    IProblemDetailsService problemDetailsService
    ) : IExceptionHandler
{

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Unhandled exception {TraceId}",
            httpContext.TraceIdentifier);

        var problem = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An unexpected error occurred",
            Detail = exception.Message 
        };

        await problemDetailsService.WriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = problem,
            Exception = exception
        });

        return true;
    }
}