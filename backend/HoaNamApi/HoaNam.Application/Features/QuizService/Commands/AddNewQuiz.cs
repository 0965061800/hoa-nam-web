using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class AddNewQuiz : IRequest<ApiResponse<Unit>>
	{
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public List<NewQuizQuestionDto> Questions { get; set; }
		public AddNewQuiz()
		{

		}
		public AddNewQuiz(Guid userId, string title)
		{
			UserId = userId;
			Title = title;
			Questions = new List<NewQuizQuestionDto>();
		}
	}

	public class NewQuizQuestionDto
	{
		public string Content { get; set; }
		public QuestionType QuestionType { get; set; }
		public List<NewQuizChoiceDto> Choices { get; set; }
		public NewQuizQuestionDto() { }
		public NewQuizQuestionDto(string content, QuestionType questionType)
		{
			Content = content;
			QuestionType = questionType;
			Choices = new List<NewQuizChoiceDto>();
		}
	}

	public class NewQuizChoiceDto
	{
		public string Content { get; set; }
		public bool IsCorrect { get; set; }
		public NewQuizChoiceDto() { }
		public NewQuizChoiceDto(string content, bool isCorrect)
		{
			Content = content;
			IsCorrect = isCorrect;
		}
	}
}
