using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Services.IRepository;
using HoaNam.Infrastructure.Identity;

namespace HoaNam.Infrastructure.Repositories.QuizRepository
{
	public class QuizRepository : IQuizRepository
	{
		public readonly AppDbContext _context;
		public QuizRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task AddNewQuiz(Quiz newQuiz)
		{
			await _context.Quizzes.AddAsync(newQuiz);
		}

		public async Task Save()
		{
			await _context.SaveChangesAsync();
		}
	}
}
