namespace JesterTech.Server.Services.Interfaces
{
    public interface IAiService
    {
        /// <summary>
        /// Gets the AI response for the given prompt.
        /// </summary>
        /// <param name="prompt"></param>
        /// <returns></returns>
        Task<string> GetAiResponseAsync(string prompt);
    }
}
