namespace HoaNam.Domain.Quiz.Entities
{
	public class QuizTag
	{
		public Guid QuizId { get; private set; }
		public Guid TagId { get; private set; }
		private QuizTag() { }
		public QuizTag(Guid quizId, Guid tagId)
		{
			QuizId = quizId;
			TagId = tagId;
		}
	}
}
