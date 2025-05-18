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
			public Guid Id { get; set; }
			public string Content { get; set; }
			public bool IsCorrect { get; set; }
			public Guid QuestionId { get; set; }
		}


		public class ContentChanged
		{
			public string Content { get; set; }
		}

		public class ChoicesSynced
		{
			//?????
		}
	}
}
