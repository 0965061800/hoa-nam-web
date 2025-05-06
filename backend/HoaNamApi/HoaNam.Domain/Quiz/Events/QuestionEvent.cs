namespace HoaNam.Domain.Quiz.Events
{
	public static class QuestionEvent
	{
		public class ChoicesAddedToQuestion
		{
			public List<(string content, bool isCorrect)> choices { get; set; } = new List<(string, bool)>();
		}
		public class ChoiceAddedToQuestion
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
