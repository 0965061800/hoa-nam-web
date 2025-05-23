using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.ValueObjects;
using HoaNam.Domain.QuizAttempts.Entities;
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
		public DbSet<QuizAttempt> QuizAttempts { get; set; }
		public DbSet<QuestionAttempt> QuestionAttempts { get; set; }

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
				entity.HasMany(e => e.Questions)
					.WithOne()
					.HasForeignKey("QuizId");

				entity.Navigation(e => e.Questions)
					.UsePropertyAccessMode(PropertyAccessMode.Field);
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
				entity.Property(c => c.Id).ValueGeneratedNever();
				entity.HasMany(e => e.Choices)
					.WithOne()
					.HasForeignKey("QuestionId");

				entity.Navigation(e => e.Choices)
					.UsePropertyAccessMode(PropertyAccessMode.Field);
			});

			builder.Entity<Choice>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Property(c => c.Id).ValueGeneratedNever();
			});

			builder.Entity<QuizAttempt>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Property(p => p.Id).ValueGeneratedNever();
				entity.HasMany(e => e.QuestionAttempts)
					.WithOne()
					.HasForeignKey("AttemptId");
				entity.Navigation(e => e.QuestionAttempts)
					.UsePropertyAccessMode(PropertyAccessMode.Field);
			});

			builder.Entity<QuestionAttempt>(entity =>
			{
				entity.HasKey(e => e.Id);
				entity.Property(p => p.Id).ValueGeneratedNever();
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
