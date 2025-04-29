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
		public Guid QuestionId { get; }
		public Choice(string content, bool isCorrect) => Apply(new ChoiceEvent.ChoiceCreated
		{
			ChoiceId = new Guid(),
			Content = content,
			IsCorrect = isCorrect
		});

		protected override void When(object @event)
		{
			switch (@event)
			{
				case ChoiceEvent.ChoiceCreated e:
					Id = e.ChoiceId;
					Content = e.Content;
					IsCorrect = e.IsCorrect;
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
