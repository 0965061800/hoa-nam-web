namespace HoaNam.Application.Features.QuizService.Dto
{
	public class QuizResponseDto
	{
		public Guid Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public bool IsShuffled { get; set; }
		public List<QuestionResponseDto> Questions { get; set; } = new List<QuestionResponseDto>();
	}

	public class QuestionResponseDto
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public QuestionType QuestionType { get; set; }
		public List<ChoiceResponseDto> Choices { get; set; } = new List<ChoiceResponseDto> { };
	}

	public class ChoiceResponseDto
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
