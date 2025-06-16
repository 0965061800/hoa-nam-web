using HoaNam.Application.Common;
using HoaNam.Application.Interfaces;
using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Services.IRepository;
using HoaNam.Infrastructure.Auth;
using HoaNam.Infrastructure.Identity;
using HoaNam.Infrastructure.Repositories;
using HoaNam.Infrastructure.Repositories.QuizRepository;
using HoaNam.Infrastructure.Repositories.User;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace HoaNam.Infrastructure
{
	public static class DependecyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("DefaultConnection");
			if (connectionString is null) throw new ArgumentException(connectionString);

			services.AddDbContext<AppDbContext>((sp, options) =>
			{
				options.UseSqlServer(connectionString);
			});

			services.AddIdentity<AppIdentityUser, IdentityRole<Guid>>()
					.AddEntityFrameworkStores<AppDbContext>()
					.AddDefaultTokenProviders();

			JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = configuration["Jwt:Issuer"],
					ValidAudience = configuration["Jwt:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
				};
			});



			services.AddScoped<IJwtTokenService, JwtTokenService>();

			services.AddScoped<IIdentityService, IdentityService>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IQuizQueryRepository, QuizQueryRepository>();
			services.AddScoped<IQuizRepository, QuizRepository>();
			services.AddScoped<IAttemptRepository, AttemptRepository>();
			return services;
		}
	}
}
