namespace JesterTech.Server.HttpClients
{
    public interface IAiClient
    {
        /// <summary>
        /// Gets the AI response for the given prompt.
        /// </summary>
        /// <param name="prompt"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<string> GetAiResponseAsync(string prompt, CancellationToken cancellationToken);
    }
}
