using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.ValueObjects;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HoaNam.Infrastructure.Identity
{
	public class AppDbContext : IdentityDbContext<AppIdentityUser, IdentityRole<Guid>, Guid>
	{
		public AppDbContext(DbContextOptions<AppDbContext> options)
		: base(options)
		{
		}
		public DbSet<Question> Questions { get; set; }
		public DbSet<Quiz> Quizzes { get; set; }
		public DbSet<Choice> Choices { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<AppIdentityUser>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Property(e => e.Email).IsRequired();
			});

			builder.Entity<IdentityRole<Guid>>(entity =>
			{
				entity.HasKey(e => e.Id);
			});

			builder.Entity<Quiz>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Ignore(e => e.Questions);
				entity.HasMany<Question>("_questions")
					.WithOne()
					.HasForeignKey("QuizId");
				entity.Property(e => e.Title)
				.HasConversion(
					title => title.Value,
					value => QuizTitle.FromString(value)
					);
				entity.HasOne<AppIdentityUser>().WithMany().HasForeignKey("CreatedUserId");
			});

			builder.Entity<Question>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Ignore(e => e.Choices);
				entity.HasMany<Choice>("_choices")
				.WithOne()
				.HasForeignKey("QuestionId");
			});

			var adminRoleId = new Guid("11111111-1111-1111-1111-111111111110");
			var adminUserId = new Guid("11111111-1111-1111-1111-111111111111");

			// Seed Role
			builder.Entity<IdentityRole<Guid>>().HasData(
				new IdentityRole<Guid>
				{
					Id = adminRoleId,
					Name = "Admin",
					NormalizedName = "ADMIN"
				}
			);

			// Seed Admin User
			builder.Entity<AppIdentityUser>().HasData(
				new AppIdentityUser
				{
					Id = adminUserId,
					UserName = "admin@example.com",
					NormalizedUserName = "ADMIN@EXAMPLE.COM",
					Email = "admin@example.com",
					NormalizedEmail = "ADMIN@EXAMPLE.COM",
					EmailConfirmed = true,
					FirstName = "Admin",
					LastName = "User",
					AvatarUrl = "https://i.pravatar.cc/150?img=1",
					PasswordHash = "AQAAAAIAAYagAAAAEFtOQ+zCShSNGZ8tBuHEPSfpUlchH2qxDmvONh7r1UKa8tH8o4nG+EKg0AK0ruCHzQ==" // Đặt hashed password tại đây
				}
			);

			// Gán Role cho Admin User
			builder.Entity<IdentityUserRole<Guid>>().HasData(
				new IdentityUserRole<Guid>
				{
					RoleId = adminRoleId,
					UserId = adminUserId
				}
			);
		}
	}
}
