using HoaNam.Domain.QuizAttempts.Event;
using HoaNam.Framework;

namespace HoaNam.Domain.QuizAttempts.Entities
{
	public class QuizAttempts : Entity<Guid>
	{
		public Guid Id { get; private set; }
		public Guid PlayerId { get; private set; }
		public Guid QuizId { get; private set; }
		public double Score { get; private set; }



		public DateTime AttemptTime { get; private set; }

		public QuizAttempts(Guid id, Guid playerId, Guid QuizId, int Score) => Apply(new QuizAttemptsEvent.AttemptMaked
		{
			Id = id,
			PlayerId = playerId,
			QuizId = QuizId,
			Score = Score
		});

		protected override void When(object @event)
		{
			switch (@event)
			{
				case QuizAttemptsEvent.AttemptMaked e:
					Id = e.Id;
					PlayerId = e.PlayerId;
					QuizId = e.QuizId;
					Score = e.Score;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			//Chua nghi ra duoc gi
		}
	}
}
