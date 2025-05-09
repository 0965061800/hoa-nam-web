using HoaNam.Domain.Quiz.Events;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Framework;

namespace HoaNam.Domain.Quiz.Entities
{
	public class Choice : Entity<Guid>
	{
		public Guid Id { get; private set; }
		public string Content { get; private set; } = "";
		public bool IsCorrect { get; private set; }
		public Guid QuestionId { get; private set; }
		public Choice(Guid Id, string content, bool isCorrect, Guid questionId) => Apply(new ChoiceEvent.ChoiceCreated
		{
			ChoiceId = Id,
			Content = content,
			IsCorrect = isCorrect,
			QuestionId = questionId
		});
		public void UpdateContent(string newContent)
		{
			if (Content != newContent) Apply(new ChoiceEvent.ChoiceContentUpdated
			{
				Content = newContent
			});
		}
		protected override void When(object @event)
		{
			switch (@event)
			{
				case ChoiceEvent.ChoiceCreated e:
					Id = e.ChoiceId;
					Content = e.Content;
					IsCorrect = e.IsCorrect;
					QuestionId = e.QuestionId;
					break;
				case ChoiceEvent.ChoiceContentUpdated e:
					Content = e.Content;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			var valid = Id != null && Content != null;
			if (!valid) throw new InvalidEntityStateException(this, $"Post-checks failed in some field");
		}
	}
}
