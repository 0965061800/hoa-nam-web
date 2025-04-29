using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Application.Interfaces.IRepositories
{
	public interface IQuizQueryRepository
	{
		Task<List<Quiz>> GetQuizzesByAdminId(Guid adminId);
	}
}
