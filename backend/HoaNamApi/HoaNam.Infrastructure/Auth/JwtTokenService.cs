using HoaNam.Application.Common;
using HoaNam.Application.Features.AuthService.SignIn.Command;
using HoaNam.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HoaNam.Infrastructure.Auth
{
	public class JwtTokenService : IJwtTokenService
	{
		private readonly UserManager<AppIdentityUser> _userManager;
		private readonly IConfiguration _configuration;
		public JwtTokenService(UserManager<AppIdentityUser> userManager, IConfiguration configuration)
		{
			_userManager = userManager;
			_configuration = configuration;
		}
		public async Task<string> CreateToken(LoggedInUserDto user)
		{
			var dbUser = await _userManager.FindByIdAsync(user.UserId.ToString());

			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
			};

			claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role)));

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddDays(20),
				signingCredentials: creds);
			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
