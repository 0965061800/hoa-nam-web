using AutoMapper;
using HoaNam.Application.Features.QuestionService.Command;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNamApi.Dtos.Quiz;

namespace HoaNamApi.Mapping
{
	public class QuestionProfile : Profile
	{
		public QuestionProfile()
		{
			CreateMap<QuestionRequestDto, NewQuizQuestionDto>().ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices));
			CreateMap<UpdateQuestionDto, QuestionUpdateCommand>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => new Guid(src.Id)))
				.ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices));
			CreateMap<NewQuestionDto, QuestionCreateCommand>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
				.ForMember(dest => dest.Choices, opt => opt.MapFrom(src => src.Choices));
		}
	}
}
