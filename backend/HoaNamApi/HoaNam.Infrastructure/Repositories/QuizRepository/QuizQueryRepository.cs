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
		public async Task<List<Quiz>> GetQuizzesByAdminId(Guid adminId)
		{
			var quizzes = await _dbContext.Quizzes.Where(q => q.CreatedUserId == adminId).ToListAsync();
			return quizzes;
		}

	}
}
