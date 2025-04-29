using HoaNam.Framework;

namespace HoaNam.Domain.Quiz.ValueObjects
{
	public class QuizTitle : Value<QuizTitle>
	{
		public string Value { get; private set; }
		internal QuizTitle(string value) => Value = value;
		public static QuizTitle FromString(string title)
		{
			CheckValidity(title);
			return new QuizTitle(title);
		}
		public static implicit operator string(QuizTitle title) => title.Value;
		private static void CheckValidity(string value)
		{
			if (value.Length > 100) throw new ArgumentOutOfRangeException("Title cannot be longer that 100 characters", nameof(value));
		}

	}
}
