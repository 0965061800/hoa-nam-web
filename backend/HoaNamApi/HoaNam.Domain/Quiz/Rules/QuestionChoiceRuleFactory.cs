using HoaNam.Domain.Quiz.Interfaces;

namespace HoaNam.Domain.Quiz.Rules
{
	public static class QuestionChoiceRuleFactory
	{
		public static IQuestionChoiceRule GetRuleFor(QuestionType type)
		{
			return type switch
			{
				QuestionType.SingleChoice => new QuestionRule.SingleChoiceQuestionChoiceRule(),
				QuestionType.Text => new QuestionRule.TextQuestionChoiceRule(),
				QuestionType.FillInBlank => new QuestionRule.FillInBlankQuestionChoiceRule(),
				QuestionType.MultipleChoice => new QuestionRule.MultipleChoiceQuestionChoiceRule(),
			};
		}
	}
}
