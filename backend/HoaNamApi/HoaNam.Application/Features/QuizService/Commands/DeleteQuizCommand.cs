using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class DeleteQuizCommand : IRequest<ApiResponse<UnitValue>>
	{
		public Guid QuizId { get; set; }
	}
}
