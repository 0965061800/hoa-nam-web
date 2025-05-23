using AutoMapper;
using HoaNam.Application.Features.AuthService.SignIn.Command;
using HoaNam.Application.Features.AuthService.SignUp;
using HoaNamApi.Dtos.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly IMediator _mediator;
		private readonly IMapper _mapper;

		public AccountController(IMediator mediator, IMapper mapper)
		{
			_mediator = mediator;
			_mapper = mapper;
		}
		[HttpPost("admin/signup")]
		public async Task<IActionResult> SignUp([FromBody] UserSignUpDto dto)
		{
			var command = _mapper.Map<SignUpRequest>(dto);
			command.Role = "Admin";
			var result = await _mediator.Send(command);
			return Ok(result);
		}

		[HttpPost("admin/signin")]
		public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
		{
			var result = await _mediator.Send(request);
			UserLoggedInResponse response = new UserLoggedInResponse()
			{
				UserId = result.UserId,
				Roles = result.Roles,
				Token = result.Token,
				Username = result.Username
			};
			return Ok(response);
		}

		[HttpPost("signup")]
		public async Task<IActionResult> UserSignUp([FromBody] UserSignUpDto dto)
		{
			var command = _mapper.Map<SignUpRequest>(dto);
			command.Role = "User";
			var result = await _mediator.Send(command);
			return Ok(result);
		}

		[HttpPost("signin")]
		public async Task<IActionResult> UserSignIn([FromBody] SignInRequest request)
		{
			var result = await _mediator.Send(request);
			UserLoggedInResponse response = new UserLoggedInResponse()
			{
				UserId = result.UserId,
				Roles = result.Roles,
				Token = result.Token,
				Username = result.Username
			};
			return Ok(response);
		}
	}
}
