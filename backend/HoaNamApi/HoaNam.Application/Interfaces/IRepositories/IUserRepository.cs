namespace HoaNam.Application.Interfaces.IRepositories
{
	public interface IUserRepository
	{
		Task<bool> CheckUserExist(Guid userId);
		Task SaveChanges();
	}
}
