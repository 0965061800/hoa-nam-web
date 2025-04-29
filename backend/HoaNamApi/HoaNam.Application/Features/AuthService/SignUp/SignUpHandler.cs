using HoaNam.Application.Common.Models;
using HoaNam.Application.Interfaces;
using MediatR;

namespace HoaNam.Application.Features.AuthService.SignUp
{
	public class SignUpHandler : IRequestHandler<SignUpRequest, UnitValue>
	{
		private readonly IIdentityService _identityService;
		public SignUpHandler(IIdentityService identityService)
		{
			_identityService = identityService;
		}

		public async Task<UnitValue> Handle(SignUpRequest request, CancellationToken cancellationToken)
		{
			await _identityService.SignUp(request.Username, request.Password);
			return UnitValue.Value;
		}
	}
}
