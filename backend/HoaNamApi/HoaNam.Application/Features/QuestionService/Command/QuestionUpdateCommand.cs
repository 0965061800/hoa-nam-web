using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.QuestionService.Command
{
	public class QuestionUpdateCommand : IRequest<ApiResponse<UnitValue>>
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public Guid UserId { get; set; }
		public Guid QuizId { get; set; }
		public List<ChoiceUpdateDto> Choices { get; set; } = new List<ChoiceUpdateDto> { };
	}
	public class ChoiceUpdateDto
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
