using AutoMapper;
using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.QuizService.Dto;
using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Quiz.Entities;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetDetailQuizByAdminHandler : IRequestHandler<GetDetailQuizByAdmin, ApiResponse<QuizResponseDto>>
	{
		private readonly IQuizQueryRepository _quizRepo;
		private readonly IMapper _mapper;
		public GetDetailQuizByAdminHandler(IQuizQueryRepository quizRepo, IMapper mapper)
		{
			_quizRepo = quizRepo;
			_mapper = mapper;
		}

		public async Task<ApiResponse<QuizResponseDto>> Handle(GetDetailQuizByAdmin request, CancellationToken cancellationToken)
		{
			Result<Quiz> result = await _quizRepo.GetQuizzByIdByAdmin(request.QuizId, request.AdminId);
			if (result.IsSuccess)
			{
				QuizResponseDto responseDto = _mapper.Map<QuizResponseDto>(result.Data);
				return ApiResponse<QuizResponseDto>.Success(responseDto);
			}
			else
				return ApiResponse<QuizResponseDto>.Fail(result.Error!);

		}
	}
}
