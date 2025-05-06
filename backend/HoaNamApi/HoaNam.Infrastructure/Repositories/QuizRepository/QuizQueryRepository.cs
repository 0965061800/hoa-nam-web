using HoaNam.Application.Common.Models;
using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Quiz.Entities;
using HoaNam.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace HoaNam.Infrastructure.Repositories.QuizRepository
{
	public class QuizQueryRepository : IQuizQueryRepository
	{
		private readonly AppDbContext _dbContext;
		public QuizQueryRepository(AppDbContext dbContext)
		{
			_dbContext = dbContext;
		}
		public async Task<Result<List<Quiz>>> GetQuizzesByAdminId(Guid adminId)
		{
			var quizzes = await _dbContext.Quizzes.Include(q => q.Questions).ThenInclude(qu => qu.Choices).Where(q => q.CreatedUserId == adminId).ToListAsync();
			Result<List<Quiz>> result = Result<List<Quiz>>.Success(quizzes);
			return result;
		}

	}
}
