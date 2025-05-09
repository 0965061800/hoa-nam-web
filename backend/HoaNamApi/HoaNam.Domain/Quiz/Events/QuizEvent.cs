namespace HoaNam.Domain.Quiz.Events
{
	public static class QuizEvent
	{
		public class QuizCreated
		{
			public Guid Id { get; set; }
			public string Title { get; set; }
			public Guid CreatedUserId { get; set; }
		}

		public class QuestionAddedToQuizEvent
		{
			public Guid QuestionId { get; set; }
			public string Content { get; set; }
			public QuestionType QuestionType { get; set; }
		}
		public class QuestionRemovedFromQuizEvent
		{
			public Guid questionId { get; set; }
		}

		public class IsShuffledChangeEvent
		{
			public bool IsShuffled { get; set; }
		}

		public class TitleChanged
		{
			public string Value { get; set; }
		}
	}
}