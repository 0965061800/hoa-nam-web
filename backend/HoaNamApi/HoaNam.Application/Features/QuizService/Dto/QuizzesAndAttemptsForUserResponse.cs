namespace HoaNam.Application.Features.QuizService.Dto
{
	public class QuizzesAndAttemptsForUserResponse
	{
		public Guid QuizId { get; set; }
		public string Title { get; set; }
		public int NumberOfQuestion { get; set; }
		public int NumberOfAttempt { get; set; }
		public int AverageSuccessRate { get; set; }
	}


}
