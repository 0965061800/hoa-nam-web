using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class UpdateQuizCommand : IRequest<ApiResponse<UnitValue>>
	{
		public Guid Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public bool IsShuffled { get; set; }
		public ushort TimeToPlay { get; set; }
		public Guid UserId { get; set; }
		public List<Guid> TagIds { get; set; }
	}
}
