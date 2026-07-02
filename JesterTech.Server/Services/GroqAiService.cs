using System.Text;
using System.Text.Json;
using System.Net.Http.Headers;

namespace JesterTech.Server.Services
{
    public class GroqAiService : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        // Përdorim Typed HttpClient ku Injeksioni i Varësive menaxhon vetë izolimin e kërkesave
        public GroqAiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetAiResponseAsync(string prompt)
        {
            var apiKey = _configuration["AiSettings: ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("AI service configuration is missing.");

            var requestBody = new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[] { new { role = "user", content = prompt } },
                temperature = 0.2
            };

            var jsonPayload = JsonSerializer.Serialize(requestBody);
            using var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.groq.com/openai/v1/chat/completions");
            request.Content = content;
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                var errorResponse = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Groq API Error: {response.StatusCode} - {errorResponse}");
            }

            var responseString = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseString);

            var aiResponseText = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return aiResponseText?.Trim() ?? string.Empty;
        }
    }
}