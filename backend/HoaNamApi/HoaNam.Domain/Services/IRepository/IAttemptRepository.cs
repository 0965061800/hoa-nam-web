using HoaNam.Domain.QuizAttempts.Entities;

namespace HoaNam.Domain.Services.IRepository
{
	public interface IAttemptRepository
	{
		void Add(QuizAttempt attempt);
		Task Save();
	}
}
