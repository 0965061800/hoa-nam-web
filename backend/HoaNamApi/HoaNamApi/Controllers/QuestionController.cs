using AutoMapper;
using HoaNam.Application.Features.QuestionService.Command;
using HoaNamApi.Dtos.Quiz;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class QuestionController : ControllerBase
	{
		private readonly IMediator _mediator;
		private readonly IMapper _mapper;
		public QuestionController(IMediator mediator, IMapper mapper)
		{
			_mediator = mediator;
			_mapper = mapper;
		}
		[HttpPost("update")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> UpdateQuestion(UpdateQuestionDto dto)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);

			QuestionUpdateCommand updateCommand = _mapper.Map<QuestionUpdateCommand>(dto);

			updateCommand.UserId = userId;
			await _mediator.Send(updateCommand);
			return Ok();
		}
	}
}
