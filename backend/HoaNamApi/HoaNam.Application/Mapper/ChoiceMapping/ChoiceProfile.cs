using AutoMapper;
using HoaNam.Application.Features.QuizService.Dto;
using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Application.Mapper.ChoiceMapping
{
	public class ChoiceProfile : Profile
	{
		public ChoiceProfile()
		{
			CreateMap<Choice, ChoiceResponseDto>()
				.ForMember(dest => dest.ChoiceContent, opt => opt.MapFrom(src => src.Content));
		}
	}
}
