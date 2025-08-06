namespace HoaNam.Application.Features.QuizService.Dto
{
	public class QuizInfoDto
	{
		public Guid QuizId { get; set; }
		public string Title { get; set; } = string.Empty;
		public bool IsShuffled { get; set; }
		public ushort TimeToPlay { get; set; }
		public List<QuestionInfoDto> Questions { get; set; } = new List<QuestionInfoDto>();
	}

	public class QuestionInfoDto
	{
		public Guid QuestionId { get; set; }
		public string QuestionContent { get; set; } = string.Empty;
		public QuestionType QuestionType { get; set; }
		public List<ChoiceInfoDto> Choices { get; set; } = new List<ChoiceInfoDto> { };
	}

	public class ChoiceInfoDto
	{
		public Guid ChoiceId { get; set; }
		public string ChoiceContent { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
