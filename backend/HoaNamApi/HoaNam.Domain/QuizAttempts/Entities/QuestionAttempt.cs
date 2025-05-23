using HoaNam.Domain.QuizAttempts.Event;
using HoaNam.Framework;

namespace HoaNam.Domain.QuizAttempts.Entities
{
	public class QuestionAttempt : Entity<Guid>
	{
		public Guid Id { get; set; }
		public Guid AttemptId { get; set; }
		public Guid QuestionId { get; set; }
		public Guid CorrectChoiceId { get; set; }
		public Guid PickedChoiceId { get; set; }
		public QuestionAttempt(Guid id, Guid attemptId, Guid questionId, Guid correctChoiceId, Guid pickedChoiceId)
		{
			Apply(new QuestionAttemptEvent.QuestionAttemptCreated
			{
				Id = id,
				AttemptId = attemptId,
				QuestionId = questionId,
				CorrectChoiceId = correctChoiceId,
				PickedChoiceId = pickedChoiceId
			});
		}
		protected override void When(object @event)
		{
			switch (@event)
			{
				case QuestionAttemptEvent.QuestionAttemptCreated e:
					Id = e.Id;
					AttemptId = e.AttemptId;
					QuestionId = e.QuestionId;
					CorrectChoiceId = e.CorrectChoiceId;
					PickedChoiceId = e.PickedChoiceId;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			throw new NotImplementedException();
		}
	}
}
