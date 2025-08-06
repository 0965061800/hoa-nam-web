using System.ComponentModel.DataAnnotations;

namespace HoaNamApi.Dtos.Quiz
{
	public class UpdateQuizDto
	{
		[Required(ErrorMessage = "Missing Quiz Id")]
		public string Id { get; set; }
		[Required(ErrorMessage = "Missing Quiz Title")]
		[StringLength(100, ErrorMessage = "Limit 100 charaters and more than 1 charaters", MinimumLength = 1)]
		public string Title { get; set; } = string.Empty;
		public bool IsShuffled { get; set; }
		public ushort TimeToPlay { get; set; }
	}
}
