using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Services.IRepository;
using HoaNam.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

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

		public async Task<Quiz?> GetQuizAsync(Guid Id)
		{
			var quiz = await _context.Quizzes.Include(x => x.Questions).ThenInclude(x => x.Choices).FirstOrDefaultAsync(x => x.Id == Id);
			return quiz;
		}

		public async Task Save()
		{
			await _context.SaveChangesAsync();
		}

		public async Task UpdateQuiz(Quiz quiz)
		{
			_context.Update(quiz);
		}
	}
}
