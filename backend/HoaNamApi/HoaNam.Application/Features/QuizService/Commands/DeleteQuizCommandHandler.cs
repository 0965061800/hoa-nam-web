using HoaNam.Application.Common.Models;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class DeleteQuizCommandHandler : IRequestHandler<DeleteQuizCommand, ApiResponse<UnitValue>>
	{
		private readonly IQuizRepository _quizRepo;
		public DeleteQuizCommandHandler(IQuizRepository quizRepository)
		{
			_quizRepo = quizRepository;
		}
		public async Task<ApiResponse<UnitValue>> Handle(DeleteQuizCommand command, CancellationToken cancellationToken)
		{
			await _quizRepo.Delete(command.QuizId);
			await _quizRepo.Save();
			return ApiResponse<UnitValue>.Success(UnitValue.Value);
		}
	}
}
