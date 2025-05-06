namespace HoaNam.Domain.Services.IRepository
{
	public interface IQuizRepository
	{
		Task AddNewQuiz(Quiz.Entities.Quiz quiz);
		Task Save();
	}
}
