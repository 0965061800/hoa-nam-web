using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace HoaNam.Infrastructure.Identity
{
	public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
	{
		public AppDbContext CreateDbContext(string[] args)
		{
			var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

			optionsBuilder.UseSqlServer("Server=DESKTOP-JUT4AI8\\SQLEXPRESS;Database=HoaNamDb;Trusted_Connection=True;TrustServerCertificate=True;");

			return new AppDbContext(optionsBuilder.Options);
		}
	}
}
