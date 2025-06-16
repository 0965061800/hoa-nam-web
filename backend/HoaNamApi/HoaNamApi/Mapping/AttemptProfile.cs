using AutoMapper;
using HoaNam.Application.Features.AttemptService.Commands;
using HoaNamApi.Dtos.Attempt;

namespace HoaNamApi.Mapping
{
	public class AttemptProfile : Profile
	{
		public AttemptProfile()
		{
			CreateMap<AttemptRequestDto, MakeAttemptCommand>();
		}
	}
}
