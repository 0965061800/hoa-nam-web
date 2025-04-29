using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.AuthService.SignIn.Command;

namespace HoaNam.Application.Interfaces
{
	public interface IIdentityService
	{
		Task<Result<LoggedInUserDto>> CheckingSignInUser(string username, string password);
		Task<Result<UnitValue>> SignUp(string username, string password);
	}
}
