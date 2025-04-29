using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Quiz.Entities;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetQuizzesByAdminHandler : IRequestHandler<GetQuizzesByAdmin, List<Quiz>>
	{
		private readonly IQuizQueryRepository _quizRepo;
		public GetQuizzesByAdminHandler(IQuizQueryRepository quizRepo)
		{
			_quizRepo = quizRepo;
		}

		public async Task<List<Quiz>> Handle(GetQuizzesByAdmin request, CancellationToken cancellationToken)
		{
			List<Quiz> quizzes = await _quizRepo.GetQuizzesByAdminId(request.adminId);
			return quizzes;
		}

	}
}
