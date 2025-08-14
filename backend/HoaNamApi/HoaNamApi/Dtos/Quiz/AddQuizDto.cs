using System.ComponentModel.DataAnnotations;

namespace HoaNamApi.Dtos.Quiz
{
	public class AddQuizDto
	{
		[Required(ErrorMessage = "The quiz title must not be empty")]
		public string Title { get; set; }
		public List<QuestionRequestDto> Questions { get; set; }
		public List<Guid> TagIds { get; set; } = new();
		public bool IsShuffled { get; set; }
		public ushort TimeToPlay { get; set; } = 0;
	}

	public class QuestionRequestDto
	{
		[Required(ErrorMessage = "The question need content")]
		public string Content { get; set; }
		public QuestionType QuestionType { get; set; }
		[Required(ErrorMessage = "The question need some choices")]
		public List<ChoiceRequestDto> Choices { get; set; }
	}

	public class ChoiceRequestDto
	{
		[Required(ErrorMessage = "The choice need some content")]
		public string Content { get; set; }
		public bool IsCorrect { get; set; }
	}
}