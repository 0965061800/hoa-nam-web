using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class AddNewQuiz : IRequest<ApiResponse<Unit>>
	{
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public bool IsShuffled { get; set; }
		public ushort TimeToPlay { get; set; } = 0;
		public List<NewQuizQuestionDto> Questions { get; set; }
		public List<Guid> TagIds { get; set; }
		public AddNewQuiz()
		{

		}
		public AddNewQuiz(Guid userId, string title, ushort timeToPlay, List<Guid> tagIds)
		{
			UserId = userId;
			Title = title;
			TimeToPlay = timeToPlay;
			Questions = new List<NewQuizQuestionDto>();
			TagIds = tagIds;
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
