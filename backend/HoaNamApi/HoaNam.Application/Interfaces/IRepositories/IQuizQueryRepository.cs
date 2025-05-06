using HoaNam.Application.Common.Models;
using HoaNam.Domain.Quiz.Entities;

namespace HoaNam.Application.Interfaces.IRepositories
{
	public interface IQuizQueryRepository
	{
		Task<Result<List<Quiz>>> GetQuizzesByAdminId(Guid adminId);
	}
}
