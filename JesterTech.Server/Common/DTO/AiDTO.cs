using System.ComponentModel.DataAnnotations;

namespace JesterTech.Server.Common.DTO
{
    public class AiQuestionDTO
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        [StringLength(250, ErrorMessage = "The question must be between 1 and 250 characters.", MinimumLength = 2)]
        public string UserQuestion { get; set; } = string.Empty;
        [Required]
        public string Preference { get; set; } = string.Empty;
    }
    public class GeneralQuestionDTO
    {
        [Required]
        [StringLength(250, ErrorMessage = "The question must be between 1 and 250 characters.", MinimumLength = 2)]
        public string UserQuestion { get; set; } = string.Empty;
        [Required]
        public string Preference { get; set; } = string.Empty;
    }

    public class CompareAiQuestionDTO
    {
        [Required]
        public List<int> ProductIds { get; set; }
        [Required]
        [StringLength(250, ErrorMessage = "The question must be between 1 and 250 characters.", MinimumLength = 2)]
        public string UserQuestion { get; set; } = string.Empty;
        [Required]
        public string Preference { get; set; } = string.Empty;
    }
}
