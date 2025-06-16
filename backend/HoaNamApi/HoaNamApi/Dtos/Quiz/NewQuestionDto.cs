using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HoaNamApi.Dtos.Quiz
{
	public class NewQuestionDto
	{
		public string Id { get; set; }
		public string QuizId { get; set; }
		[JsonPropertyName("questionContent")]
		[Required(ErrorMessage = "The question need content")]
		public string Content { get; set; } = string.Empty;

		public QuestionType QuestionType { get; set; }

		[Required(ErrorMessage = "More than one choices")]
		public List<NewChoiceDto> Choices { get; set; } = new List<NewChoiceDto>();
	}

	public class NewChoiceDto
	{
		public string Id { get; set; }
		[JsonPropertyName("choiceContent")]
		[Required(ErrorMessage = "The choice need content")]
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
