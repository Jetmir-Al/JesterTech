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
}
