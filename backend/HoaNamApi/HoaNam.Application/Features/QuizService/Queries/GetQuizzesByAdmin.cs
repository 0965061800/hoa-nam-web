using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.QuizService.Dto;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetQuizzesByAdmin : IRequest<ApiResponse<List<QuizResponseDto>>>
	{
		public Guid adminId { get; set; }
	}
}
