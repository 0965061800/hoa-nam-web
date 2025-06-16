using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.QuizService.Dto;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetListQuizzesAndAttemptsByUser : IRequest<ApiResponse<List<QuizzesAndAttemptsForUserResponse>>>
	{
		public Guid UserId { get; set; }
	}
}
