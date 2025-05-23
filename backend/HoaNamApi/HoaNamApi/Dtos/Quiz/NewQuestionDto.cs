using System.ComponentModel.DataAnnotations;

namespace HoaNamApi.Dtos.Quiz
{
	public class NewQuestionDto
	{
		public string Id { get; set; }
		public string QuizId { get; set; }
		[Required(ErrorMessage = "The question need content")]
		public string Content { get; set; } = string.Empty;

		public QuestionType QuestionType { get; set; }

		[Required(ErrorMessage = "More than one choices")]
		public List<NewChoiceDto> Choices { get; set; } = new List<NewChoiceDto>();
	}

	public class NewChoiceDto
	{
		public string Id { get; set; }
		[Required(ErrorMessage = "The choice need content")]
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
