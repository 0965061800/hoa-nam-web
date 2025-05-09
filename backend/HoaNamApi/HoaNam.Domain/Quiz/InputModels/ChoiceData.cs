namespace HoaNam.Domain.Quiz.InputModels
{
	public class ChoiceData
	{
		public Guid Id { get; set; }
		public string Content { get; set; } = string.Empty;
		public bool IsCorrect { get; set; }
	}
}
