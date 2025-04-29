using HoaNam.Domain.Quiz.Events;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Domain.Quiz.ValueObjects;
using HoaNam.Framework;

namespace HoaNam.Domain.Quiz.Entities
{
	public class Quiz : Entity<Guid>
	{
		public Guid Id { get; private set; }
		public QuizTitle Title { get; private set; }
		public DateTime CreatedAt { get; private set; }
		public DateTime UpdateAt { get; private set; }
		public bool IsShuffled { get; private set; }
		public Guid CreatedUserId { get; private set; }

		private readonly List<Question> _questions = new();
		public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();
		public Quiz(Guid id, QuizTitle title, Guid createdUserId) => Apply(new QuizEvent.QuizCreated
		{
			Id = id,
			Title = title,
			CreatedUserId = createdUserId
		});



		public void AddQuestion(string content, QuestionType typeQuestion) => Apply(new QuizEvent.QuestionAddedToQuizEvent
		{
			Content = content,
			QuestionType = typeQuestion
		});

		public void RemoveQuestion(Guid questionId)
		{
			var questionRemoved = _questions.Find(x => x.Id == questionId);
			if (questionRemoved == null) throw new QuizException("The question is not in the quiz");
			Apply(new QuizEvent.QuestionRemovedFromQuizEvent
			{
				questionId = questionId,
			});
		}

		public void ChangeSuffled(bool value) =>
			Apply(new QuizEvent.IsShuffledChangeEvent
			{
				IsShuffled = value
			});

		protected override void When(object @event)
		{
			switch (@event)
			{
				case QuizEvent.QuizCreated e:
					Id = e.Id;
					Title = new QuizTitle(e.Title);
					CreatedAt = DateTime.UtcNow;
					UpdateAt = DateTime.UtcNow;
					CreatedUserId = e.CreatedUserId;
					break;
				case QuizEvent.QuestionAddedToQuizEvent e:
					Question newQuestion = new Question(e.Content, e.QuestionType);
					_questions.Add(newQuestion);
					break;
				case QuizEvent.QuestionRemovedFromQuizEvent e:
					var questionRemove = _questions.Find(q => q.Id == e.questionId);
					_questions.Remove(questionRemove!);
					break;
				case QuizEvent.IsShuffledChangeEvent e:
					IsShuffled = e.IsShuffled;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			var valid = Id != null && Title != null && CreatedAt != null;
			if (!valid) throw new InvalidEntityStateException(this, $"Post-checks failed in some field");
		}
	}
}


