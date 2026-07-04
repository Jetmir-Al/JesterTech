namespace JesterTech.Server.DTO
{
    public class AiQuestionDTO
    {
        public int ProductId { get; set; }
        public string UserQuestion { get; set; } = string.Empty;

        public string Preference { get; set; } = string.Empty;
    }
    public class GeneralQuestionDTO
    {
        public string UserQuestion { get; set; } = string.Empty;
        public string Preference { get; set; } = string.Empty;
    }

    public class CompareAiQuestionDTO
    {
        public int ProductId1 { get; set; }
        public int ProductId2 { get; set; }
        public string UserQuestion { get; set; } = string.Empty;
        public string Preference { get; set; } = string.Empty;
    }
}
