using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNam.Application.Features.QuizService.Dto;
using HoaNam.Application.Features.QuizService.Queries;
using HoaNam.Infrastructure.Identity;
using HoaNamApi.Dtos.Quiz;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Security.Claims;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class QuizController : ControllerBase
	{
		private readonly IMediator _mediator;
		private readonly IMapper _mapper;
		private readonly DbConnection _connection;
		private readonly AppDbContext _context;

		public QuizController(IMediator mediator, IMapper mapper, AppDbContext context)
		{
			_mediator = mediator;
			_mapper = mapper;
			_context = context;
			_connection = context.Database.GetDbConnection();
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

		[HttpDelete("delete/{quizId}")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> DeleteQuiz([FromRoute] string quizId)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);

			DeleteQuizCommand deleteCommand = new()
			{
				QuizId = new Guid(quizId)
			};

			await _mediator.Send(deleteCommand);
			return Ok();
		}

		[Authorize(Roles = "Admin")]
		[HttpGet("admin")]
		public async Task<IActionResult> GetAdminQuizzes([FromQuery] FilterSortPagingRequest FSPR)
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);
			var result = await _connection.GetAdminQuizzesWithFSP(userId, FSPR);
			return Ok(result);
		}

		[Authorize(Roles = "Admin")]
		[HttpGet("QuizDetail/{quizId}")]
		public async Task<IActionResult> GetQuizInfo([FromRoute] string quizId)
		{
			var result = await _connection.GetAdminQuizDetail(new Guid(quizId));
			return Ok(result);
		}
	}
}
