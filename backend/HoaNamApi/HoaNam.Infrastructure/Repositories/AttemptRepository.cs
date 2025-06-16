using HoaNam.Domain.QuizAttempts.Entities;
using HoaNam.Domain.Services.IRepository;
using HoaNam.Infrastructure.Identity;

namespace HoaNam.Infrastructure.Repositories
{
	public class AttemptRepository : IAttemptRepository
	{
		private readonly AppDbContext _context;
		public AttemptRepository(AppDbContext context)
		{
			_context = context;
		}
		public void Add(QuizAttempt attempt)
		{
			_context.QuizAttempts.Add(attempt);
		}

		public async Task Save()
		{
			await _context.SaveChangesAsync();
		}
	}
}
