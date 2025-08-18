namespace HoaNam.Application.Features.QuizService.Dto
{
	public class QuizzesAndAttemptsForUserResponse
	{
		public Guid QuizId { get; set; }
		public string Title { get; set; }
		public ushort TimeToPlay { get; set; }
		public int NumberOfQuestion { get; set; }
		public int NumberOfAttempt { get; set; }
		public double AverageSuccessRate { get; set; }
		public List<string> TagNames { get; set; } = new();
	}

	public class TagNamesOfQuiz
	{
		public Guid QuizId { get; set; }
		public string Name { get; set; } = string.Empty;
	}

}
