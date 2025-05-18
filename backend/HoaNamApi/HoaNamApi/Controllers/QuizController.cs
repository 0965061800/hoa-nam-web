using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNam.Application.Features.QuizService.Queries;
using HoaNamApi.Dtos.Quiz;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class QuizController : ControllerBase
	{
		private readonly IMediator _mediator;
		private readonly IMapper _mapper;

		public QuizController(IMediator mediator, IMapper mapper)
		{
			_mediator = mediator;
			_mapper = mapper;
		}

		[HttpGet]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetAllQuizByAdmin()
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			GetQuizzesByAdmin newRequest = new GetQuizzesByAdmin
			{
				adminId = new Guid(accountId),
			};
			var result = await _mediator.Send(newRequest);
			if (!result.IsSuccess) return BadRequest(result.Error);
			return Ok(result.Data);
		}

		[HttpGet("quizId={quizId}")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> GetQuizById([FromRoute] string quizId)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			GetDetailQuizByAdmin request = new GetDetailQuizByAdmin
			{
				QuizId = new Guid(quizId),
				AdminId = new Guid(accountId),
			};
			var result = await _mediator.Send(request);
			if (!result.IsSuccess) return BadRequest(result.Error);
			return Ok(result.Data);
		}


		[HttpPost("add")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> AddNewQuiz(AddQuizDto requestDto)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);

			AddNewQuiz addCommand = _mapper.Map<AddNewQuiz>(requestDto);

			addCommand.UserId = userId;
			await _mediator.Send(addCommand);
			return Ok();
		}

		[HttpPost("update")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> UpdateQuiz(UpdateQuizDto dto)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);

			UpdateQuizCommand addCommand = _mapper.Map<UpdateQuizCommand>(dto);

			addCommand.UserId = userId;
			await _mediator.Send(addCommand);
			return Ok();
		}
	}
}
