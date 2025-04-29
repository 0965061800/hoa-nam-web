using HoaNam.Application.Features.AuthService.SignIn.Command;

namespace HoaNam.Application.Common
{
	public interface IJwtTokenService
	{
		Task<string> CreateToken(LoggedInUserDto user);
	}
}
