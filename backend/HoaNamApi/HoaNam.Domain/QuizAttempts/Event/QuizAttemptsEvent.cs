namespace HoaNam.Domain.QuizAttempts.Event
{
	public static class QuizAttemptsEvent
	{
		public class AttemptMaked
		{
			public Guid Id { get; set; }
			public Guid PlayerId { get; set; }
			public Guid QuizId { get; set; }
			public double Score { get; set; }
		}
	}
}
