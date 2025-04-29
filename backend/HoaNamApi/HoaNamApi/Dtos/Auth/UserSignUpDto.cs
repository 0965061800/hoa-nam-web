using System.ComponentModel.DataAnnotations;

namespace HoaNamApi.Dtos.Auth
{
	public class UserSignUpDto
	{
		[Required(ErrorMessage = "We need your username")]
		[RegularExpression(@"^[A-Za-z][A-Za-z0-9]*$", ErrorMessage = "Username must start with a letter and contain only letters and numbers.")]
		public string? Username { get; set; }

		[Required(ErrorMessage = "We need your password")]
		[StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 100 characters.")]
		[RegularExpression(@"^(?=.*[A-Z])(?=.*[^\w\s]).{8,}$", ErrorMessage = "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.")]
		public string? Password { get; set; }


		[Required(ErrorMessage = "Please confirm your password")]
		[Compare("Password", ErrorMessage = "Password and confirmation password do not match.")]
		public string? ConfirmPassword { get; set; }
	}
}
