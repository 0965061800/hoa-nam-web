namespace HoaNam.Application.Features.AuthService.SignIn.Command
{
	public class LoggedInUserDto
	{
		public Guid UserId { get; set; } = Guid.NewGuid();
		public string Email { get; set; } = string.Empty;
		public string UserName { get; set; } = string.Empty;
		public List<string> Roles { get; set; } = new();
	}
}
