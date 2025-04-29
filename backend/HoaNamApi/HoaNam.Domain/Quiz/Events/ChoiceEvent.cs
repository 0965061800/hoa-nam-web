namespace HoaNam.Domain.Quiz.Events
{
	public static class ChoiceEvent
	{
		public class ChoiceCreated
		{
			public Guid ChoiceId { get; set; }
			public string Content { get; set; }
			public bool IsCorrect { get; set; }
		}
	}
}
