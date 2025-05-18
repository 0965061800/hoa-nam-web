using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Domain.Quiz.Interfaces
{
	public interface IQuestionChoiceRule
	{
		void ValidateCanAddListOfChoice(Question question, List<Choice> choices);
		void CheckValidListChoice(List<Choice> choices);
	}
}
