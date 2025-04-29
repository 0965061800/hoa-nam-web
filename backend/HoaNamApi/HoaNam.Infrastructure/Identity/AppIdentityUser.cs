using Microsoft.AspNetCore.Identity;

namespace HoaNam.Infrastructure.Identity
{
	public class AppIdentityUser : IdentityUser<Guid>
	{
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? AvatarUrl { get; set; }
	}
}
