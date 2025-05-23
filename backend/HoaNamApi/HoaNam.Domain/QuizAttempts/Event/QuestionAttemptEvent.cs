namespace HoaNam.Domain.QuizAttempts.Event
{
	public static class QuestionAttemptEvent
	{
		public class QuestionAttemptCreated
		{
			public Guid Id { get; set; }
			public Guid AttemptId { get; set; }
			public Guid QuestionId { get; set; }
			public Guid CorrectChoiceId { get; set; }
			public Guid PickedChoiceId { get; set; }
		}
	}
}
