using HoaNam.Application.Common.Models;
using HoaNam.Domain.Quiz.InputModels;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.QuestionService.Command
{
	public class QuestionUpdateHandler : IRequestHandler<QuestionUpdateCommand, ApiResponse<UnitValue>>
	{
		private readonly IQuizRepository _quizRepo;
		public QuestionUpdateHandler(IQuizRepository quizRepo)
		{
			_quizRepo = quizRepo;
		}

		public async Task<ApiResponse<UnitValue>> Handle(QuestionUpdateCommand request, CancellationToken cancellationToken)
		{
			var quiz = await _quizRepo.GetQuizAsync(request.QuizId);
			if (quiz == null) return ApiResponse<UnitValue>.Fail("Can not find the quiz through quizId");
			if (quiz.CreatedUserId != request.UserId) return ApiResponse<UnitValue>.Fail("The userId is not match with userId in database");

			List<ChoiceData> choices = request.Choices.Select(x =>
				new ChoiceData
				{
					Id = x.Id,
					Content = x.Content,
					IsCorrect = x.IsCorrect,
				})
			.ToList();
			quiz.UpdateQuestion(request.Id, request.Content, choices);
			await _quizRepo.Save();

			return ApiResponse<UnitValue>.Success(UnitValue.Value);
		}
	}
}
