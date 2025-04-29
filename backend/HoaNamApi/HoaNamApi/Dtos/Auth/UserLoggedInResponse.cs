namespace HoaNamApi.Dtos.Auth
{
	public class UserLoggedInResponse
	{
		public string Token { get; set; } = string.Empty;
		public string Username { get; set; } = string.Empty;
		public string UserId { get; set; } = string.Empty;
		public List<string>? Roles { get; set; }
	}
}
