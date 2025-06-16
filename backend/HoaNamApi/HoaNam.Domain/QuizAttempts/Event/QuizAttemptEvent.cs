using HoaNam.Domain.QuizAttempts.InputModels;

namespace HoaNam.Domain.QuizAttempts.Event
{
	public static class QuizAttemptEvent
	{
		public class AttemptMaked
		{
			public Guid Id { get; set; }
			public Guid PlayerId { get; set; }
			public Guid QuizId { get; set; }
			public int TotalQuestion { get; set; }
			public int TotalRightAnswer { get; set; }
		}

		public class ListQuestionAttemptAdded
		{
			public List<QuestionAttemptData> answerData { get; set; } = new();
		}
	}
}
