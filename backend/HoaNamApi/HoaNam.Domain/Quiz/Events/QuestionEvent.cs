namespace HoaNam.Domain.Quiz.Events
{
	public static class QuestionEvent
	{
		public class ChoiceAddedToQuestion()
		{
			public string Content { get; set; }
			public bool IsCorrect { get; set; }
		}

		public class ChoiceRemovedFromQuestion
		{
			public Guid ChoiceId { get; set; }
		}

		public class ContentChanged
		{
			public string Content { get; set; }
		}
	}
}
