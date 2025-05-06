using AutoMapper;
using HoaNam.Application.Features.QuizService.Dto;
using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Application.Mapper.QuestionMapping
{
	public class QuestionProfile : Profile
	{
		public QuestionProfile()
		{
			CreateMap<Question, QuestionResponseDto>()
				.ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices));
		}
	}
}
