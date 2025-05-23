using HoaNam.Application.Common.Models;
using HoaNam.Application.Features.AuthService.SignIn.Command;
using HoaNam.Application.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HoaNam.Infrastructure.Identity
{
	public class IdentityService : IIdentityService
	{
		private readonly UserManager<AppIdentityUser> _userManager;
		public IdentityService(UserManager<AppIdentityUser> userManager)
		{
			_userManager = userManager;
		}


		public async Task<Result<UnitValue>> SignUp(string username, string password, string role)
		{
			var user = new AppIdentityUser { Id = Guid.NewGuid(), UserName = username, Email = "" };
			var result = await _userManager.CreateAsync(user, password);
			var createdUser = await _userManager.FindByNameAsync(username);
			if (result.Succeeded) await _userManager.AddToRoleAsync(createdUser, role);
			return Result<UnitValue>.Success(UnitValue.Value);
		}

		public async Task<Result<LoggedInUserDto>> CheckingSignInUser(string username, string password)
		{
			var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
			if (user == null) return Result<LoggedInUserDto>.Fail("The username is not exist");
			await _userManager.CheckPasswordAsync(user, password);
			if (user == null) return Result<LoggedInUserDto>.Fail("The password is wrong");
			var roles = await _userManager.GetRolesAsync(user);
			LoggedInUserDto userInfo = new LoggedInUserDto
			{
				Email = user.Email ?? "",
				Roles = roles != null ? roles.ToList() : new List<string>(),
				UserName = user.UserName!,
				UserId = user.Id
			};
			return Result<LoggedInUserDto>.Success(userInfo);
		}
	}
}
