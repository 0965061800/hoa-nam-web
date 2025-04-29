using AutoMapper;
using HoaNam.Application.Features.QuizService.Commands;
using HoaNam.Application.Features.QuizService.Queries;
using HoaNamApi.Dtos.Quiz;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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
		public async Task<IActionResult> GetAllQuizByAdmin(string Id)
		{
			Guid userId = new Guid("11111111-1111-1111-1111-111111111111");
			GetQuizzesByAdmin newRequest = new GetQuizzesByAdmin
			{
				adminId = userId,
			};
			var result = await _mediator.Send(newRequest);
			return Ok(result);
		}


		[HttpPost("add")]
		public async Task<IActionResult> AddNewQuiz(AddQuizDto requestDto)
		{
			AddNewQuizCommand addCommand = _mapper.Map<AddNewQuizCommand>(requestDto);
			addCommand.Id = Guid.NewGuid();
			addCommand.UserId = new Guid("11111111-1111-1111-1111-111111111111");
			await _mediator.Send(addCommand);
			return Ok();
		}
	}
}
