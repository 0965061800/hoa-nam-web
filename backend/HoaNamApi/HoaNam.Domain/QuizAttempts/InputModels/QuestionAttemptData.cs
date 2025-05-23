namespace HoaNam.Domain.QuizAttempts.InputModels
{
	public class QuestionAttemptData
	{
		public Guid Id { get; set; }
		public Guid AttemptId { get; set; }
		public Guid QuestionId { get; set; }
		public Guid CorrectChoiceId { get; set; }
		public Guid PickedChoiceId { get; set; }
	}
}
