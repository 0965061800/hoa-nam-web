using HoaNam.Domain.Quiz.Entities;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetQuizzesByAdmin : IRequest<List<Quiz>>
	{
		public Guid adminId { get; set; }
	}
}
