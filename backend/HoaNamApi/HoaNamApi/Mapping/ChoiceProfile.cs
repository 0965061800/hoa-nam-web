using AutoMapper;
using HoaNam.Application.Features.QuestionService.Command;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNamApi.Dtos.Quiz;

namespace HoaNamApi.Mapping
{
	public class ChoiceProfile : Profile
	{
		public ChoiceProfile()
		{
			CreateMap<ChoiceRequestDto, NewQuizChoiceDto>();
			CreateMap<UpdateChoiceDto, ChoiceUpdateDto>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(src.Id) ? Guid.NewGuid() : new Guid(src.Id)));
		}
	}
}
