using HoaNam.Application.Common.Models;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class UpdateQuizHandler : IRequestHandler<UpdateQuizCommand, ApiResponse<UnitValue>>
	{

		private readonly IQuizRepository _quizRepo;
		public UpdateQuizHandler(IQuizRepository quizRepo)
		{
			_quizRepo = quizRepo;
		}

		public async Task<ApiResponse<UnitValue>> Handle(UpdateQuizCommand request, CancellationToken cancellationToken)
		{
			var quiz = await _quizRepo.GetQuizAsync(request.Id);
			if (quiz == null) return ApiResponse<UnitValue>.Fail("Can not find the quiz through quizId");
			if (quiz.CreatedUserId != request.UserId) return ApiResponse<UnitValue>.Fail("The userId is not match with userId in database");

			if (quiz.Title != request.Title) quiz.ChangeTitle(request.Title);
			if (quiz.IsShuffled != request.IsShuffled) quiz.ChangeSuffled(request.IsShuffled);

			await _quizRepo.UpdateQuiz(quiz);
			await _quizRepo.Save();

			return ApiResponse<UnitValue>.Success(UnitValue.Value);
		}
	}
}
