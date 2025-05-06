using AutoMapper;
using HoaNam.Application.Features.QuizService.Dto;
using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Application.Mapper.QuizMapping

{
	public class QuizProfile : Profile
	{
		public QuizProfile()
		{
			CreateMap<Quiz, QuizResponseDto>()
				.ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.Questions));
		}
	}
}
