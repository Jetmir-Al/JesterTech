using Microsoft.AspNetCore.Mvc;

namespace JesterTech.Server.Middlewares.Middleware;

public static class ProblemDetailsExtensions
{
    public static IServiceCollection AddApiProblemDetails(this IServiceCollection services)
    {
        services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = context =>
            {
                context.ProblemDetails.Extensions["traceId"] =
                    context.HttpContext.TraceIdentifier;
              
                if (!context.HttpContext.Request.Host.Host.Contains("localhost"))
                    context.ProblemDetails.Extensions.Remove("exception");
            };
        });
        return services;
    }
}
