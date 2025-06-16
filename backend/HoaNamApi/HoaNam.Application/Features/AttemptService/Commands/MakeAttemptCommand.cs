using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.AttemptService.Commands
{
	public class MakeAttemptCommand : IRequest<ApiResponse<UnitValue>>
	{
		public Guid UserId { get; set; }
		public Guid QuizId { get; set; }
		public int TotalQuestion { get; set; }
		public int TotalRightAnswer { get; set; }
	}
}
