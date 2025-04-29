using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNamApi.Dtos.Quiz;

namespace HoaNamApi.Mapping
{
	public class QuizProfile : Profile
	{
		public QuizProfile()
		{
			CreateMap<AddQuizDto, AddNewQuizCommand>().ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));
		}
	}
}
