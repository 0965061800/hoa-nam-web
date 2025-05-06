using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNamApi.Dtos.Quiz;

namespace HoaNamApi.Mapping
{
	public class QuestionProfile : Profile
	{
		public QuestionProfile()
		{
			CreateMap<QuestionRequestDto, NewQuizQuestionDto>().ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices));
		}
	}
}
