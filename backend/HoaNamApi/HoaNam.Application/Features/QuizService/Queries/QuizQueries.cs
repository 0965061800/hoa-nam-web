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

		public static async Task<PageListResponse<QuizzesAndAttemptsForUserResponse>> GetQuizzesWithUserAttemptWithFSP(this DbConnection connection, GetListQuizzesAndAttemptsByUser param, FilterSortPagingRequest FSPR)
		{

			var sql1 = @"SELECT Count(q.Id)
						FROM Quizzes q
						WHERE q.Title LIKE '%'+@name+'%'";
			int totalQuizzes = Convert.ToInt32(connection.ExecuteScalar(sql1, new { name = FSPR.Filter ?? "" }));
			if (FSPR.PageSize < 5) FSPR.PageSize = 5;
			if (FSPR.PageSize > 20) FSPR.PageSize = 20;
			if (FSPR.PageIndex < 0) FSPR.PageIndex = 1;
			int totalPage = (int)Math.Ceiling((double)totalQuizzes / FSPR.PageSize);
			if (FSPR.PageIndex > totalPage && totalPage > 0) FSPR.PageIndex = totalPage;
			int offset = (FSPR.PageIndex - 1) * FSPR.PageSize;

			var sql = @"SELECT 
							q.Id AS QuizId, 
							q.Title, 
							COUNT(DISTINCT qu.Id) AS NumberOfQuestion, 
							COUNT(qat.Id) AS NumberOfAttempt,
							CAST (SUM(qat.hehe)/CAST(Count(qat.Id) AS DECIMAL(10,2)) AS DECIMAL(10,2)) as 'AverageSuccessRate'
						FROM Quizzes q
						LEFT JOIN Questions qu ON q.Id = qu.QuizId
						LEFT JOIN (
							SELECT Id, QuizId, COUNT(IIF(TotalQuestion=TotalRightAnswer,1,NULL)) hehe
							FROM QuizAttempts
							WHERE PlayerId = @UserId
							GROUP BY Id, QuizId
						) qat ON q.Id = qat.QuizId
						WHERE q.Title LIKE '%' + @Filter + '%'
						GROUP BY q.Id, q.Title, q.CreatedAt
						ORDER BY 
							CASE WHEN @Sorting = 0 THEN q.CreatedAt ELSE NULL END,
							CASE WHEN @Sorting = 1 THEN q.Title ELSE NULL END,
							CASE WHEN @Sorting = 2 THEN q.Id ELSE NULL END
						OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY ;";

			List<QuizzesAndAttemptsForUserResponse> quizzes = (await connection.QueryAsync<QuizzesAndAttemptsForUserResponse>(sql, new { UserId = param.UserId, Filter = FSPR.Filter ?? "", Sorting = FSPR.Sorting, Offset = offset, PageSize = FSPR.PageSize })).ToList();
			PageListResponse<QuizzesAndAttemptsForUserResponse> result = new PageListResponse<QuizzesAndAttemptsForUserResponse>();
			result.Data = quizzes;
			result.TotalPage = totalPage;
			result.PageSize = FSPR.PageSize;
			result.PageIndex = FSPR.PageIndex;
			return result;
		}

		public static async Task<PageListResponse<AdminQuizResponse>> GetAdminQuizzesWithFSP(this DbConnection connection, Guid adminId, FilterSortPagingRequest FSPR)
		{

			var sql1 = @"SELECT Count(q.Id)
						FROM Quizzes q
						WHERE q.Title LIKE '%'+@name+'%'";
			int totalQuizzes = Convert.ToInt32(connection.ExecuteScalar(sql1, new { name = FSPR.Filter ?? "" }));
			if (FSPR.PageSize < 5) FSPR.PageSize = 5;
			if (FSPR.PageSize > 20) FSPR.PageSize = 20;
			if (FSPR.PageIndex < 0) FSPR.PageIndex = 1;
			int totalPage = (int)Math.Ceiling((double)totalQuizzes / FSPR.PageSize);
			if (FSPR.PageIndex > totalPage && totalPage > 0) FSPR.PageIndex = totalPage;
			int offset = (FSPR.PageIndex - 1) * FSPR.PageSize;
			var sql = @"SELECT 
							q.Id AS QuizId, 
							q.Title, 
							COUNT(qu.Id) AS NumberOfQuestion
						FROM Quizzes q
						LEFT JOIN Questions qu ON q.Id = qu.QuizId
						WHERE q.Title LIKE '%' + @Filter + '%' AND q.CreatedUserId = @UserId
						GROUP BY q.Id, q.Title, q.CreatedAt
						ORDER BY 
							CASE WHEN @Sorting = 0 THEN q.CreatedAt ELSE NULL END,
							CASE WHEN @Sorting = 1 THEN q.Title ELSE NULL END,
							CASE WHEN @Sorting = 2 THEN q.Id ELSE NULL END
						OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY ;";

			List<AdminQuizResponse> quizzes = (await connection.QueryAsync<AdminQuizResponse>(sql, new { UserId = adminId, Filter = FSPR.Filter ?? "", Sorting = FSPR.Sorting, Offset = offset, PageSize = FSPR.PageSize })).ToList();
			PageListResponse<AdminQuizResponse> result = new PageListResponse<AdminQuizResponse>();
			result.Data = quizzes;
			result.TotalPage = totalPage;
			result.PageSize = FSPR.PageSize;
			result.PageIndex = FSPR.PageIndex;
			return result;
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