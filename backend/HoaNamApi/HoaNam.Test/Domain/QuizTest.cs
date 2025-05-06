using FluentAssertions;
using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.Exceptions;
using HoaNam.Domain.Quiz.ValueObjects;

namespace HoaNam.Test.Domain
{
	public class QuizTests
	{
		[Fact]
		public void CreateQuiz_ShouldSetInitialState()
		{
			// Arrange
			var quizId = Guid.NewGuid();
			var title = QuizTitle.FromString("Test Quiz");
			var userId = Guid.NewGuid();

			// Act
			var quiz = new Quiz(quizId, title, userId);

			// Assert
			quiz.Id.Should().Be(quizId);
			quiz.Title.Value.Should().Be("Test Quiz");
			quiz.CreatedUserId.Should().Be(userId);
			quiz.Questions.Should().BeEmpty();
		}

		[Fact]
		public void AddQuestion_ShouldAddToQuiz()
		{
			var quiz = CreateTestQuiz();
			var questionId = Guid.NewGuid();

			quiz.AddQuestion(questionId, "What is the capital of Vietnam?", QuestionType.SingleChoice);

			quiz.Questions.Should().ContainSingle(q => q.Id == questionId && q.Content == "What is the capital of Vietnam?");
		}

		[Fact]
		public void RemoveQuestion_ShouldRemoveFromQuiz()
		{
			var quiz = CreateTestQuiz();
			var questionId = Guid.NewGuid();
			quiz.AddQuestion(questionId, "To be removed", QuestionType.SingleChoice);

			quiz.RemoveQuestion(questionId);

			quiz.Questions.Should().BeEmpty();
		}

		[Fact]
		public void RemoveQuestion_NotInQuiz_ShouldThrow()
		{
			var quiz = CreateTestQuiz();
			var missingId = Guid.NewGuid();

			Action act = () => quiz.RemoveQuestion(missingId);

			act.Should().Throw<QuizException>().WithMessage("The question is not in the quiz");
		}



		[Fact]
		public void ChangeShuffle_ShouldUpdateFlag()
		{
			var quiz = CreateTestQuiz();

			quiz.ChangeSuffled(true);

			quiz.IsShuffled.Should().BeTrue();
		}

		private Quiz CreateTestQuiz()
		{
			return new Quiz(Guid.NewGuid(), QuizTitle.FromString("Demo Quiz"), Guid.NewGuid());
		}
	}
}
