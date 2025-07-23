namespace HoaNam.Domain.Services.IRepository
{
	public interface IQuizRepository
	{
		Task AddNewQuiz(Quiz.Entities.Quiz quiz);
		Task UpdateQuiz(Quiz.Entities.Quiz quiz);
		Task<Quiz.Entities.Quiz?> GetQuizAsync(Guid Id);
		Task Delete(Guid quizId);
		Task Save();
	}
}
