using HoaNam.Application.Common.Models;
using HoaNam.Domain.QuizAttempts.Entities;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.AttemptService.Commands
{
	public class MakeAttemptCommandHandler : IRequestHandler<MakeAttemptCommand, ApiResponse<UnitValue>>
	{
		private readonly IAttemptRepository _repo;
		public MakeAttemptCommandHandler(IAttemptRepository repo)
		{
			_repo = repo;
		}

		public async Task<ApiResponse<UnitValue>> Handle(MakeAttemptCommand command, CancellationToken token)
		{
			Guid attemptId = Guid.NewGuid();
			QuizAttempt newQuizAttempt = new QuizAttempt(attemptId, command.UserId, command.QuizId, command.TotalQuestion, command.TotalRightAnswer);
			_repo.Add(newQuizAttempt);
			await _repo.Save();
			return ApiResponse<UnitValue>.Success(UnitValue.Value);
		}
	}
}
