using Dapper;
using HoaNam.Application.Features.QuizService.Dto;
using System.Data.Common;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public static class QuizQueries
	{
		public static async Task<List<QuizzesAndAttemptsForUserResponse>> GetQuizzesWithUserAttempt(this DbConnection connection, GetListQuizzesAndAttemptsByUser param)
		{
			var sql = @"SELECT q.Id as QuizId, q.Title, COUNT(qu.Id) as NumberOfQuestion, COUNT(qat.Id) as NumberOfAttempt
						FROM Quizzes q
						LEFT JOIN Questions qu ON q.Id = qu.QuizId
						LEFT JOIN (
							SELECT *
							FROM QuizAttempts
							WHERE QuizAttempts.PlayerId = @UserId
						) as qat ON q.Id = qat.QuizId
						GROUP BY q.Id, q.Title";

			List<QuizzesAndAttemptsForUserResponse> quizzes = (await connection.QueryAsync<QuizzesAndAttemptsForUserResponse>(sql, new { UserId = param.UserId })).ToList();
			return quizzes;

		}

		public static async Task<QuizInfoDto?> GetQuizInfo(this DbConnection connection, Guid quizId)
		{
			var sql = @"
					SELECT 
						q.Id as QuizId, q.Title, q.IsShuffled,
						qu.Id as QuestionId, qu.QuestionType, qu.Content as QuestionContent,
						c.Id as ChoiceId, c.Content as ChoiceContent, c.IsCorrect
					FROM Quizzes q
					INNER JOIN Questions qu ON q.Id = qu.QuizId
					INNER JOIN Choices c ON qu.Id = c.QuestionId
					WHERE q.Id = @QuizId";

			var quizLookup = new Dictionary<Guid, QuizInfoDto>();

			await connection.QueryAsync<QuizInfoDto, QuestionInfoDto, ChoiceInfoDto, QuizInfoDto>(
				sql,
				(quiz, question, choice) =>
				{
					if (!quizLookup.TryGetValue(quiz.QuizId, out var quizEntry))
					{
						quizEntry = new QuizInfoDto
						{
							QuizId = quiz.QuizId,
							Title = quiz.Title,
							IsShuffled = quiz.IsShuffled,
							Questions = new List<QuestionInfoDto>()
						};
						quizLookup.Add(quizEntry.QuizId, quizEntry);
					}

					var questionEntry = quizEntry.Questions.FirstOrDefault(q => q.QuestionId == question.QuestionId);
					if (questionEntry == null)
					{
						questionEntry = new QuestionInfoDto
						{
							QuestionId = question.QuestionId,
							QuestionContent = question.QuestionContent,
							QuestionType = question.QuestionType,
							Choices = new List<ChoiceInfoDto>()
						};
						quizEntry.Questions.Add(questionEntry);
					}

					if (choice != null && !questionEntry.Choices.Any(c => c.ChoiceId == choice.ChoiceId))
					{
						questionEntry.Choices.Add(new ChoiceInfoDto
						{
							ChoiceId = choice.ChoiceId,
							ChoiceContent = choice.ChoiceContent,
							IsCorrect = choice.IsCorrect
						});
					}

					return quizEntry;
				},
				param: new { QuizId = quizId },
				splitOn: "QuestionId,ChoiceId"
			);

			return quizLookup.Values.FirstOrDefault();
		}


	}
}

//public Guid QuizId { get; set; }
//public string Title { get; set; }
//public int NumberOfQuestion { get; set; }
//public int NumberOfAttempt { get; set; }
//public int AverageSuccessRate { get; set; }