namespace HoaNam.Application.Features.QuizService.Dto
{
	public class QuestionsCreatedDto
	{
		public string Content { get; set; }
		public QuestionType QuestionType { get; set; }
		public List<ChoicesCreatedDto> Choices { get; set; }
	}
}
