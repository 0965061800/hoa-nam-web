using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.QuizService.Dto;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetDetailQuizByAdmin : IRequest<ApiResponse<QuizResponseDto>>
	{
		public Guid QuizId { get; set; }
		public Guid AdminId { get; set; }
	}
}
