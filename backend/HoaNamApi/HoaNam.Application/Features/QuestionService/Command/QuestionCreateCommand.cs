using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuestionService.Command
{
	public class QuestionCreateCommand : IRequest<ApiResponse<UnitValue>>
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public QuestionType QuestionType { get; set; }
		public Guid UserId { get; set; }
		public Guid QuizId { get; set; }
		public List<ChoiceCreateDto> Choices { get; set; } = new List<ChoiceCreateDto> { };
	}
	public class ChoiceCreateDto
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
