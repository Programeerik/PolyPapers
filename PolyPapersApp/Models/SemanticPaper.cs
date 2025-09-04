namespace PolyPapersApp.Models
{
    public class SemanticPaper
    {
        public string PaperId { get; set; }
        public string Title { get; set; }
        public List<SemanticCitation> Citations { get; set; }
    }
}
