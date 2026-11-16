using System.Security.Claims;
using System.Threading.RateLimiting;

namespace JesterTech.Server.Middlewares.Middleware;

public static class RateLimitingExtensions
{
    public static IServiceCollection AddRateLimiting(this IServiceCollection services, IConfiguration config)
    {
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(ctx =>
            {
                var userId = ctx.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown";

                return userId is { Length: > 0 }
                    ? RateLimitPartition.GetFixedWindowLimiter(
                        $"user:{userId}",
                        _ => new FixedWindowRateLimiterOptions { PermitLimit = 100, Window = TimeSpan.FromMinutes(1) })
                    : RateLimitPartition.GetFixedWindowLimiter(
                        $"ip:{ip}",
                        _ => new FixedWindowRateLimiterOptions { PermitLimit = 20, Window = TimeSpan.FromMinutes(1) });
            });
        });
        return services;
    }
}
