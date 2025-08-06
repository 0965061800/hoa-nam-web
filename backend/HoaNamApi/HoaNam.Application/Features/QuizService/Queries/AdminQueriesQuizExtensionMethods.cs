using Dapper;
using HoaNam.Application.Features.QuizService.Dto;
using System.Data.Common;

namespace HoaNam.Application.Features.QuizService.Queries
{
	public static class AdminQueriesQuizExtensionMethods
	{
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

		public static async Task<QuizResponseDto?> GetAdminQuizDetail(this DbConnection connection, Guid quizId)
		{
			var sql = @"
					SELECT 
						q.Id, q.Title, q.IsShuffled, q.TimeToPlay,
						qu.Id, qu.QuestionType, qu.Content as QuestionContent,
						c.Id, c.Content as ChoiceContent, c.IsCorrect
					FROM Quizzes q
					INNER JOIN Questions qu ON q.Id = qu.QuizId
					INNER JOIN Choices c ON qu.Id = c.QuestionId
					WHERE q.Id = @QuizId";

			var quizLookup = new Dictionary<Guid, QuizResponseDto>();

			await connection.QueryAsync<QuizResponseDto, QuestionResponseDto, ChoiceResponseDto, QuizResponseDto>(
				sql,
				(quiz, question, choice) =>
				{
					if (!quizLookup.TryGetValue(quiz.Id, out var quizEntry))
					{
						quizEntry = new QuizResponseDto
						{
							Id = quiz.Id,
							Title = quiz.Title,
							IsShuffled = quiz.IsShuffled,
							TimeToPlay = quiz.TimeToPlay,
							Questions = new List<QuestionResponseDto>()
						};
						quizLookup.Add(quizEntry.Id, quizEntry);
					}

					var questionEntry = quizEntry.Questions.FirstOrDefault(q => q.Id == question.Id);
					if (questionEntry == null)
					{
						questionEntry = new QuestionResponseDto
						{
							Id = question.Id,
							QuestionContent = question.QuestionContent,
							QuestionType = question.QuestionType,
							Choices = new List<ChoiceResponseDto>()
						};
						quizEntry.Questions.Add(questionEntry);
					}
					if (choice != null && !questionEntry.Choices.Any(c => c.Id == choice.Id))
					{
						questionEntry.Choices.Add(new ChoiceResponseDto
						{
							Id = choice.Id,
							ChoiceContent = choice.ChoiceContent,
							IsCorrect = choice.IsCorrect
						});
					}
					return quizEntry;
				},
				param: new { QuizId = quizId },
				splitOn: "Id,Id"
			);
			return quizLookup.Values.FirstOrDefault();
		}


	}
}