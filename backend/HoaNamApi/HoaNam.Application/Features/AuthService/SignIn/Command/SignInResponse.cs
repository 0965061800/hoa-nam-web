namespace HoaNam.Application.Features.AuthService.SignIn.Command
{
	public class SignInResponse
	{
		public string Token { get; set; } = string.Empty;
		public string Username { get; set; } = string.Empty;
		public string UserId { get; set; } = string.Empty;
		public List<string>? Roles { get; set; }
	}
}
