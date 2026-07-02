namespace JesterTech.Server.Services
{
    public interface IAiService
    {
        Task<string> GetAiResponseAsync(string prompt);
    }
}
