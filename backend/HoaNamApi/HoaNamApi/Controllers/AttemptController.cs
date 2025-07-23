using AutoMapper;
using HoaNam.Application.Features.AttemptService.Commands;
using HoaNamApi.Dtos.Attempt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AttemptController : ControllerBase
	{
		private readonly IMediator _mediator;
		private readonly IMapper _mapper;

		public AttemptController(IMediator mediator, IMapper mapper)
		{
			_mediator = mediator;
			_mapper = mapper;
		}

		[HttpPost]
		[Authorize(Roles = "User")]
		public async Task<IActionResult> UserMakeAttempt([FromBody] AttemptRequestDto dto)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);
			MakeAttemptCommand command = _mapper.Map<MakeAttemptCommand>(dto);
			command.UserId = userId;
			await _mediator.Send(command);
			return Ok();
		}


	}
}
