using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Domain.Quiz.Interfaces;

namespace HoaNam.Domain.Quiz.Rules
{
	public static class QuestionRule
	{
		public class TextQuestionChoiceRule : IQuestionChoiceRule
		{
			public void ValidateCanAddChoice(Question question, Choice choice)
			{
				if (question.Choices.Count >= 0) throw new QuestionChoiceException("Text question just have one answer");
				if (choice.IsCorrect == false) throw new QuestionChoiceException("Text question required an right choice");
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				throw new NotImplementedException();
			}

			public void ValidateCanRemoveChoice(Question question, Guid choiceId)
			{
				throw new QuestionChoiceException("You just can adjust for this type of question");
			}
		}

		public class SingleChoiceQuestionChoiceRule : IQuestionChoiceRule
		{
			public void ValidateCanAddChoice(Question question, Choice choice)
			{
				if (question.Choices.Any(c => c.IsCorrect == true) && choice.IsCorrect == true) throw new QuestionChoiceException("Single Choice Question just need one answer");
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				int answerCount = choices.Count(x => x.IsCorrect == true);
				if (answerCount == 0) throw new QuestionChoiceException("This question need one right answer");
				if (answerCount >= 2) throw new QuestionChoiceException("This question just need one right answer");
			}

			public void ValidateCanRemoveChoice(Question question, Guid choiceId)
			{
				Choice targetChoice = GetChoice(question, choiceId);
				if (targetChoice.IsCorrect == true) throw new QuestionChoiceException("You can not remove the answer of the single choice question");
			}
		}

		public class MultipleChoiceQuestionChoiceRule : IQuestionChoiceRule
		{
			public void ValidateCanAddChoice(Question question, Choice choice)
			{
				//do nothing
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				int answerCount = choices.Count(x => x.IsCorrect == true);
				if (answerCount == 0) throw new QuestionChoiceException("This question need some right answer");
			}

			public void ValidateCanRemoveChoice(Question question, Guid choiceId)
			{
				Choice targetChoice = GetChoice(question, choiceId);
				if (targetChoice.IsCorrect == true && question.Choices.Count(x => x.IsCorrect == true) == 1) throw new QuestionChoiceException("You can not remove the only answer");
			}
		}
		public class FillInBlankQuestionChoiceRule : IQuestionChoiceRule
		{
			public void ValidateCanAddChoice(Question question, Choice choice)
			{
				if (question.Choices.Count >= 0) throw new QuestionChoiceException("Text question just have one answer");
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				int answerCount = choices.Count(x => x.IsCorrect == true);
				if (answerCount >= 0) throw new QuestionChoiceException("This question need one right answer");
				if (answerCount >= 2) throw new QuestionChoiceException("This question just need one choice");
			}

			public void ValidateCanRemoveChoice(Question question, Guid choiceId)
			{
				throw new QuestionChoiceException("You just can adjust for this type of question");
			}
		}

		private static Choice GetChoice(Question question, Guid choiceId)
		{
			var choice = question.Choices.FirstOrDefault(c => c.Id == choiceId);
			if (choice != null) return choice;
			else throw new QuestionChoiceException("Can not get the choice");
		}
	}
}
