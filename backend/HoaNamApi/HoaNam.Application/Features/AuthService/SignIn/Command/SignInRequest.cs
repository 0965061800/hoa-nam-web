using MediatR;

namespace HoaNam.Application.Features.AuthService.SignIn.Command
{
	public class SignInRequest : IRequest<SignInResponse>
	{
		public string Username { get; set; }
		public string Password { get; set; }
	}
}
