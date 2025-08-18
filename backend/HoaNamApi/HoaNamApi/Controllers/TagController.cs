using AutoMapper;
using HoaNam.Application.Features.TagService.Commands;
using HoaNam.Application.Features.TagService.Dto;
using HoaNam.Application.Features.TagService.Queries;
using HoaNam.Infrastructure.Identity;
using HoaNamApi.Dtos.Quiz;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace HoaNamApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class TagController : ControllerBase
	{
		private readonly IMediator _mediator;
		private readonly IMapper _mapper;
		private readonly DbConnection _connection;
		private readonly AppDbContext _context;

		public TagController(IMediator mediator, IMapper mapper, AppDbContext context)
		{
			_mediator = mediator;
			_mapper = mapper;
			_context = context;
			_connection = context.Database.GetDbConnection();
		}

		[HttpGet("get")]
		public async Task<IActionResult> GetAllTags()
		{
			HashSet<TagDtoForListing> tags = await _connection.GetAllTag();
			return Ok(tags);
		}

		[HttpPost("add")]
		[Authorize(Roles = "Admin")]
		public async Task<IActionResult> AddNewTags([FromBody] AddTagDto dto)
		{
			AddTagCommand addCommand = new AddTagCommand
			{
				Name = dto.Name
			};
			var result = await _mediator.Send(addCommand);
			if (!result.IsSuccess) return BadRequest(result.Error);
			return Ok();
		}
	}
}
