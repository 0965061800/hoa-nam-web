using System.ComponentModel.DataAnnotations;

namespace HoaNamApi.Dtos.Quiz
{
	public class UpdateQuestionDto
	{
		public string Id { get; set; }
		public string QuizId { get; set; }
		[Required(ErrorMessage = "The question need content")]
		public string Content { get; set; } = string.Empty;
		[Required(ErrorMessage = "More than one choices")]
		public List<UpdateChoiceDto> Choices { get; set; } = new List<UpdateChoiceDto>();
	}

	public class UpdateChoiceDto
	{
		public string Id { get; set; }
		[Required(ErrorMessage = "The choice need content")]
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
