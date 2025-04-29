using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Domain.Quiz.Interfaces
{
	public interface IQuestionChoiceRule
	{
		void ValidateCanAddChoice(Question question, Choice choice);
		void ValidateCanRemoveChoice(Question question, Guid choiceId);
	}
}
