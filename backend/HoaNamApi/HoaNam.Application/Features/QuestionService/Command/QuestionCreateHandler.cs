using HoaNam.Application.Common.Models;
using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.QuestionService.Command
{
	public class QuestionCreateHandler : IRequestHandler<QuestionCreateCommand, ApiResponse<UnitValue>>
	{
		private readonly IQuizRepository _quizRepo;
		public QuestionCreateHandler(IQuizRepository quizRepo)
		{
			_quizRepo = quizRepo;
		}

		public async Task<ApiResponse<UnitValue>> Handle(QuestionCreateCommand request, CancellationToken cancellationToken)
		{
			var quiz = await _quizRepo.GetQuizAsync(request.QuizId);
			if (quiz == null) return ApiResponse<UnitValue>.Fail("Can not find the quiz through quizId");
			if (quiz.CreatedUserId != request.UserId) return ApiResponse<UnitValue>.Fail("The userId is not match with userId in database");

			quiz.AddQuestion(request.Id, request.Content, request.QuestionType);
			List<Choice> choices = new List<Choice>();
			foreach (var choice in request.Choices)
			{
				Choice newChoice = new Choice(Guid.NewGuid(), choice.Content, choice.IsCorrect, request.Id);
				choices.Add(newChoice);
			}
			quiz.AddChoicesForQuestion(request.Id, choices);

			await _quizRepo.Save();

			return ApiResponse<UnitValue>.Success(UnitValue.Value);
		}
	}
}
