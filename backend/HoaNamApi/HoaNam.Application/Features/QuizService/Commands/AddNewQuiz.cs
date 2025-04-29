using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class AddNewQuizCommand : IRequest<HandlerResult>
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public Guid UserId { get; set; }
	}
}
