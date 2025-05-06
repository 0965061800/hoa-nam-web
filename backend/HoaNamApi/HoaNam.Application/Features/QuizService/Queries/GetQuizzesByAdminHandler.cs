using AutoMapper;
using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.QuizService.Dto;
using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Quiz.Entities;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public class GetQuizzesByAdminHandler : IRequestHandler<GetQuizzesByAdmin, ApiResponse<List<QuizResponseDto>>>
	{
		private readonly IQuizQueryRepository _quizRepo;
		private readonly IMapper _mapper;
		public GetQuizzesByAdminHandler(IQuizQueryRepository quizRepo, IMapper mapper)
		{
			_quizRepo = quizRepo;
			_mapper = mapper;
		}

		public async Task<ApiResponse<List<QuizResponseDto>>> Handle(GetQuizzesByAdmin request, CancellationToken cancellationToken)
		{
			Result<List<Quiz>> result = await _quizRepo.GetQuizzesByAdminId(request.adminId);
			if (result.IsSuccess)
			{
				List<QuizResponseDto> responseDtos = new List<QuizResponseDto>();
				foreach (Quiz quiz in result.Data!)
				{
					QuizResponseDto responseDto = _mapper.Map<QuizResponseDto>(quiz);
					responseDtos.Add(responseDto);
				}
				return ApiResponse<List<QuizResponseDto>>.Success(responseDtos);
			}
			else
			{
				return ApiResponse<List<QuizResponseDto>>.Fail(result.Error!);
			}
		}

	}
}
