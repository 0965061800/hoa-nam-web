using AutoMapper;
using HoaNam.Application.Features.AuthService.SignUp;
using HoaNamApi.Dtos.Auth;

namespace HoaNamApi.Mapping
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<UserSignUpDto, SignUpRequest>()
			.ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.Username))
		   .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));
		}
	}
}
