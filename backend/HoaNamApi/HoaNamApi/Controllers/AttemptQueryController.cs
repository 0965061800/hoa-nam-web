using AutoMapper;
using HoaNam.Application.Features.QuizService.Queries;
using HoaNam.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Security.Claims;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AttemptQueryController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly DbConnection _connection;
		private readonly IMapper _mapper;
		public AttemptQueryController(AppDbContext context, IMapper mapper)
		{
			_context = context;
			_connection = context.Database.GetDbConnection();
			_mapper = mapper;
		}
		[Authorize(Roles = "User")]
		[HttpGet]
		public async Task<IActionResult> GetListQuizzesAndAttempts()
		{
			var accountId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
			if (accountId == null) return Unauthorized();
			Guid userId = new Guid(accountId);


			GetListQuizzesAndAttemptsByUser request = new();
			request.UserId = userId;

			var result = await _connection.GetQuizzesWithUserAttempt(request);

			return Ok(result);
		}

		[Authorize(Roles = "User")]
		[HttpGet("QuizInfo/{quizId}")]
		public async Task<IActionResult> GetQuizInfo([FromRoute] string quizId)
		{
			var result = await _connection.GetQuizInfo(new Guid(quizId));
			return Ok(result);
		}
	}
}
