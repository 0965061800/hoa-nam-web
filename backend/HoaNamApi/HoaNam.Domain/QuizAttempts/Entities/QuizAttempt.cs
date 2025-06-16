using HoaNam.Domain.QuizAttempts.Event;
using HoaNam.Domain.QuizAttempts.InputModels;
using HoaNam.Framework;

namespace HoaNam.Domain.QuizAttempts.Entities
{
	public class QuizAttempt : Entity<Guid>
	{
		public Guid Id { get; private set; }
		public Guid PlayerId { get; private set; }
		public Guid QuizId { get; private set; }
		public DateTime AttemptTime { get; private set; }

		public int TotalQuestion { get; private set; }
		public int TotalRightAnswer { get; private set; }


		private readonly List<QuestionAttempt> _questionAttempts = new();
		public IReadOnlyCollection<QuestionAttempt> QuestionAttempts => _questionAttempts.AsReadOnly();

		public QuizAttempt(Guid id, Guid playerId, Guid quizId, int totalQuestion, int totalRightAnswer) => Apply(new QuizAttemptEvent.AttemptMaked
		{
			Id = id,
			PlayerId = playerId,
			QuizId = quizId,
			TotalQuestion = totalQuestion,
			TotalRightAnswer = totalRightAnswer
		});

		public void AddQuestionAttempts(List<QuestionAttemptData> questionAttempts) => Apply(new QuizAttemptEvent.ListQuestionAttemptAdded
		{
			answerData = questionAttempts
		});

		protected override void When(object @event)
		{
			switch (@event)
			{
				case QuizAttemptEvent.AttemptMaked e:
					Id = e.Id;
					PlayerId = e.PlayerId;
					QuizId = e.QuizId;
					TotalQuestion = e.TotalQuestion;
					TotalRightAnswer = e.TotalRightAnswer;
					AttemptTime = DateTime.UtcNow;
					break;
				case QuizAttemptEvent.ListQuestionAttemptAdded e:
					foreach (var answer in e.answerData)
					{
						QuestionAttempt newQuestionAttempts = new QuestionAttempt(answer.Id, answer.AttemptId, answer.QuestionId, answer.PickedChoiceId, answer.CorrectChoiceId);
						_questionAttempts.Add(newQuestionAttempts);
					}
					break;
			}
		}

		protected override void EnsureValidState()
		{
			//Chua nghi ra duoc gi
		}
	}
}
