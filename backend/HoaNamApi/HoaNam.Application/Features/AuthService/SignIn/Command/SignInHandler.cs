using HoaNam.Application.Common;
using HoaNam.Application.Common.Models;
using HoaNam.Application.Interfaces;
using MediatR;

namespace HoaNam.Application.Features.AuthService.SignIn.Command
{
	public class SignInHandler : IRequestHandler<SignInRequest, SignInResponse>
	{
		private readonly IJwtTokenService _jwtTokenService;
		private readonly IIdentityService _identityService;
		public SignInHandler(IJwtTokenService jwtTokenService, IIdentityService identityService)
		{
			_jwtTokenService = jwtTokenService;
			_identityService = identityService;
		}

		public async Task<SignInResponse> Handle(SignInRequest request, CancellationToken cancellationToken)
		{
			Result<LoggedInUserDto> result = await _identityService.CheckingSignInUser(request.Username, request.Password);
			if (result.IsSuccess == false) throw new UnauthorizedAccessException(result.Error);
			var user = result.Data;
			return new SignInResponse
			{
				Token = await _jwtTokenService.CreateToken(user),
				Username = user.UserName,
				Roles = user.Roles,
				UserId = user.UserId.ToString(),
			};
		}
	}
}
