using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.AuthService.SignUp
{
	public class SignUpRequest : IRequest<UnitValue>
	{
		public string Username { get; set; }
		public string Password { get; set; }
		public string Role { get; set; }
	}
}
