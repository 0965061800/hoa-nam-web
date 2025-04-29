using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace HoaNam.Infrastructure.Repositories.User
{
	public class UserRepository : IUserRepository
	{
		private readonly AppDbContext _db;
		private readonly UserManager<AppIdentityUser> _userManager;
		public UserRepository(AppDbContext dbContext, UserManager<AppIdentityUser> userManager)
		{
			_db = dbContext;
			_userManager = userManager;
		}

		public async Task<bool> CheckUserExist(Guid userId)
		{
			bool result = _userManager.Users.Any(u => u.Id == userId);
			return true;
		}

		public async Task SaveChanges()
		{
			await _db.SaveChangesAsync();
		}

	}
}
