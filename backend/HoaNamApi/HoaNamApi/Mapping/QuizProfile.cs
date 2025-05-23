﻿using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNamApi.Dtos.Quiz;

namespace HoaNamApi.Mapping
{
	public class QuizProfile : Profile
	{
		public QuizProfile()
		{
			CreateMap<AddQuizDto, AddNewQuiz>().ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.Questions));
			CreateMap<UpdateQuizDto, UpdateQuizCommand>()
				.ForMember(dest => dest.Id, opt => opt.MapFrom(src => new Guid(src.Id)));
		}
	}
}
