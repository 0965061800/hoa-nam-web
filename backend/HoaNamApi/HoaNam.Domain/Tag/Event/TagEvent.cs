namespace HoaNam.Domain.Tag.Event
{
	public static class TagEvent
	{
		public class TagCreated
		{
			public Guid Id { get; set; }
			public string Name { get; set; } = string.Empty;
			public string NormalizeName { get; set; } = string.Empty;
		}
		public class TagDeleted
		{
			public Guid Id { get; set; }
		}

		public class AddQuiz
		{
			public Guid QuizId { get; set; }
		}
	}
}
