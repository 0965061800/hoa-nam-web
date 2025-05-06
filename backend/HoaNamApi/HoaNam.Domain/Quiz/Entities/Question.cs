using HoaNam.Domain.Quiz.Events;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Domain.Quiz.Rules;
using HoaNam.Framework;

namespace HoaNam.Domain.Quiz.Entities
{
	public class Question : Entity<Guid>
	{
		public Guid Id { get; private set; }
		public string Content { get; private set; }
		public QuestionType QuestionType { get; private set; }

		private readonly List<Choice> _choices = new();

		public Guid QuizId { get; }
		public IReadOnlyCollection<Choice> Choices => _choices.AsReadOnly();
		public Question(Guid id, string content, QuestionType questionType)
		{
			Id = id;
			Content = content;
			QuestionType = questionType;
		}

		public void AddListOfChoice(List<Choice> choices)
		{
			var rule = QuestionChoiceRuleFactory.GetRuleFor(QuestionType);
			rule.ValidateCanAddListOfChoice(this, choices);

			List<(string, bool)> questionAddedEvent = new List<(string, bool)>();
			foreach (Choice choice in choices) questionAddedEvent.Add((choice.Content, choice.IsCorrect));

			Apply(new QuestionEvent.ChoicesAddedToQuestion
			{
				choices = questionAddedEvent
			});
		}
		public void AddChoice(string content, bool isCorrect)
		{
			var rule = QuestionChoiceRuleFactory.GetRuleFor(QuestionType);
			rule.ValidateCanAddChoice(this, new Choice(content, isCorrect));
			Apply(new QuestionEvent.ChoiceAddedToQuestion
			{
				Content = content,
				IsCorrect = isCorrect
			});
		}
		public void RemoveChoice(Guid choiceId)
		{
			var rule = QuestionChoiceRuleFactory.GetRuleFor(QuestionType);
			rule.ValidateCanRemoveChoice(this, choiceId);
			Apply(new QuestionEvent.ChoiceRemovedFromQuestion
			{
				ChoiceId = choiceId,
			});
		}

		//Do not need the function of Change_Question_Type

		public void ChangeContent(string content)
		{
			Apply(new QuestionEvent.ContentChanged
			{
				Content = content
			});
		}

		protected override void When(object @event)
		{
			switch (@event)
			{
				case QuestionEvent.ChoicesAddedToQuestion e:
					foreach (var choice in e.choices)
					{
						Choice choiceAdded = new Choice(choice.content, choice.isCorrect);
						_choices.Add(choiceAdded);
					}
					break;
				case QuestionEvent.ChoiceAddedToQuestion e:
					Choice newChoice = new Choice(e.Content, e.IsCorrect);
					_choices.Add(newChoice);
					break;
				case QuestionEvent.ChoiceRemovedFromQuestion e:
					var choiceNeedRemove = _choices.FirstOrDefault(c => c.Id == e.ChoiceId);
					if (choiceNeedRemove != null) _choices.Remove(choiceNeedRemove);
					break;
				case QuestionEvent.ContentChanged e:
					Content = e.Content;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			var valid = Id != null && Content != null && (
				QuestionType switch
				{
					QuestionType.Text =>
						Choices.Count() == 1,
					QuestionType.SingleChoice =>
						Choices.Count() >= 1
						&& Choices.Count(c => c.IsCorrect) == 1,
					QuestionType.MultipleChoice =>
						Choices.Count() >= 1
						&& Choices.Count(c => c.IsCorrect) >= 1,
					QuestionType.FillInBlank =>
						Choices.Count() == 1,
					_ => true
				});
			if (!valid) throw new InvalidEntityStateException(this, $"Post-checks failed in some field");
		}
	}
}

public enum QuestionType
{
	SingleChoice,
	MultipleChoice,
	FillInBlank,
	Text
}