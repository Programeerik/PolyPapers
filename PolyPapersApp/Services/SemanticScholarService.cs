using PolyPapersApp.Models;

namespace PolyPapersApp.Services
{
    public class SemanticScholarService
    {
        private readonly HttpClient _http;

        public SemanticScholarService(HttpClient http)
        {
            _http = http;
            _http.BaseAddress = new Uri("https://api.semanticscholar.org/graph/v1/");
        }

        public async Task<List<SemanticPaper>> SearchPapersAsync(string query)
        {
            var url = $"paper/search?query={Uri.EscapeDataString(query)}&fields=title,citations.title,citations.paperId&limit=5";


            var result = await _http.GetFromJsonAsync<SemanticSearchResult>(url);
            return result?.Data ?? new List<SemanticPaper>();
        }

        public async Task<SemanticPaper?> GetPaperWithCitationsAsync(string paperId)
        {
            try
            {
                var url = $"paper/{paperId}?fields=title,citations.title,citations.paperId";
                var result = await _http.GetFromJsonAsync<SemanticPaper>(url);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to load paper: {ex.Message}");
                return null;
            }
        }

    }
}
