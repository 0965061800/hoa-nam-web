using HoaNam.Application.Common.Models;
using HoaNam.Application.Interfaces;
using MediatR;

namespace HoaNam.Application.Features.AuthService.SignUp
{
	public class SignUpHandler : IRequestHandler<SignUpRequest, ApiResponse<UnitValue>>
	{
		private readonly IIdentityService _identityService;
		public SignUpHandler(IIdentityService identityService)
		{
			_identityService = identityService;
		}

		public async Task<ApiResponse<UnitValue>> Handle(SignUpRequest request, CancellationToken cancellationToken)
		{
			var result = await _identityService.SignUp(request.Username, request.Password, request.Role);
			if (result.IsSuccess)
			{
				return ApiResponse<UnitValue>.Success(UnitValue.Value);
			}
			return ApiResponse<UnitValue>.Fail(result.Error ?? "");
		}
	}
}
