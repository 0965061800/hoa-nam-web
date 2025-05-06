using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNamApi.Dtos.Quiz;

namespace HoaNamApi.Mapping
{
	public class ChoiceProfile : Profile
	{
		public ChoiceProfile()
		{
			CreateMap<ChoiceRequestDto, NewQuizChoiceDto>();
		}
	}
}
