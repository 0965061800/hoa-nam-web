namespace HoaNam.Domain.Quiz.Events
{
	public static class ChoiceEvent
	{
		public class ChoiceCreated
		{
			public Guid ChoiceId { get; set; }
			public string Content { get; set; }
			public bool IsCorrect { get; set; }
			public Guid QuestionId { get; set; }
		}
		public class ChoiceContentUpdated
		{
			public string Content { get; set; }
		}
		public class ChoiceIsCorrectUpdated
		{
			public bool IsCorrect { get; set; }
		}
	}
}
