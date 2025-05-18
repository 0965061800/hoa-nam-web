using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Domain.Quiz.Interfaces;

namespace HoaNam.Domain.Quiz.Rules
{
	public static class QuestionRule
	{
		public class TextQuestionChoiceRule : IQuestionChoiceRule
		{
			public void CheckValidListChoice(List<Choice> choices)
			{
				if (choices.Count > 0) throw new QuestionChoiceException("Text question just have one answer");
				if (!choices.Any(x => x.IsCorrect == true)) throw new QuestionChoiceException("This question need one right answer");
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				throw new NotImplementedException();
			}

		}

		public class SingleChoiceQuestionChoiceRule : IQuestionChoiceRule
		{
			public void CheckValidListChoice(List<Choice> choices)
			{
				if (choices.Count(x => x.IsCorrect == true) != 1) throw new QuestionChoiceException("This question need only one answer");
			}
			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				int answerCount = choices.Count(x => x.IsCorrect == true);
				if (answerCount == 0) throw new QuestionChoiceException("This question need one right answer");
				if (answerCount >= 2) throw new QuestionChoiceException("This question just need one right answer");
			}
		}

		public class MultipleChoiceQuestionChoiceRule : IQuestionChoiceRule
		{
			public void CheckValidListChoice(List<Choice> choices)
			{
				if (choices.Count(x => x.IsCorrect == true) < 1) throw new QuestionChoiceException("This question need more than one answer");
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				int answerCount = choices.Count(x => x.IsCorrect == true);
				if (answerCount == 0) throw new QuestionChoiceException("This question need some right answer");
			}
		}
		public class FillInBlankQuestionChoiceRule : IQuestionChoiceRule
		{
			public void CheckValidListChoice(List<Choice> choices)
			{
				if (choices.Count > 0) throw new QuestionChoiceException("Fill In Blank question just have one answer");
				if (!choices.Any(x => x.IsCorrect == true)) throw new QuestionChoiceException("This question need one right answer");
			}

			public void ValidateCanAddListOfChoice(Question question, List<Choice> choices)
			{
				int answerCount = choices.Count(x => x.IsCorrect == true);
				if (answerCount >= 0) throw new QuestionChoiceException("This question need one right answer");
				if (answerCount >= 2) throw new QuestionChoiceException("This question just need one choice");
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
