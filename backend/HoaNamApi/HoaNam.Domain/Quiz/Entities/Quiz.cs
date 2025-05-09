using HoaNam.Domain.Quiz.Events;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Domain.Quiz.InputModels;
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
		public Quiz(Guid id, QuizTitle title, Guid createdUserId)
		{
			Apply(new QuizEvent.QuizCreated
			{
				Id = id,
				Title = title,
				CreatedUserId = createdUserId
			});
		}

		public void AddQuestion(Guid questionId, string content, QuestionType typeQuestion) => Apply(new QuizEvent.QuestionAddedToQuizEvent
		{
			QuestionId = questionId,
			Content = content,
			QuestionType = typeQuestion
		});

		public void AddChoicesForQuestion(Guid questionId, List<Choice> choices)
		{
			var question = _questions.FirstOrDefault(x => x.Id == questionId);
			if (question == null) throw new QuizException("The question is not in the quiz");
			question.AddListOfChoice(choices);
		}
		public void AddChoiceForQuestion(Guid questionId, string content, bool isCorrect)
		{
			var question = _questions.FirstOrDefault(x => x.Id == questionId);
			if (question == null) throw new QuizException("The question is not in the quiz");
			question.AddChoice(Guid.NewGuid(), content, isCorrect, question.Id);
		}

		public void RemoveQuestion(Guid questionId)
		{
			var questionRemoved = _questions.Find(x => x.Id == questionId);
			if (questionRemoved == null) throw new QuizException("The question is not in the quiz");
			Apply(new QuizEvent.QuestionRemovedFromQuizEvent
			{
				questionId = questionId,
			});
		}

		public void UpdateQuestion(Guid questionId, string requestContent, List<ChoiceData> choices)
		{
			var question = _questions.FirstOrDefault(x => x.Id == questionId);
			if (question == null) throw new QuizException("The question is not in the quiz");
			question.ChangeContent(requestContent);
			question.SyncChoices(choices);
		}

		public void ChangeTitle(string title) => Apply(new QuizEvent.TitleChanged
		{
			Value = title,
		});
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
					Question newQuestion = new Question(e.QuestionId, e.Content, e.QuestionType);
					_questions.Add(newQuestion);
					UpdateAt = DateTime.UtcNow;
					break;
				case QuizEvent.QuestionRemovedFromQuizEvent e:
					var questionRemove = _questions.Find(q => q.Id == e.questionId);
					_questions.Remove(questionRemove!);
					UpdateAt = DateTime.UtcNow;
					break;
				case QuizEvent.IsShuffledChangeEvent e:
					IsShuffled = e.IsShuffled;
					UpdateAt = DateTime.UtcNow;
					break;
				case QuizEvent.TitleChanged e:
					Title = QuizTitle.FromString(e.Value);
					UpdateAt = DateTime.UtcNow;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			var valid = Title.Value != null;
			if (!valid) throw new InvalidEntityStateException(this, $"Post-checks failed in some field");
		}
	}
}


