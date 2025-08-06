using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Infrastructure.Identity;

namespace HoaNam.Infrastructure.Repositories.QuizRepository
{
	public class QuizQueryRepository : IQuizQueryRepository
	{
		private readonly AppDbContext _dbContext;
		public QuizQueryRepository(AppDbContext dbContext)
		{
			_dbContext = dbContext;
		}

	}
}
