namespace HoaNam.Application.Common.Models
{
	public class ApiResponse<T>
	{
		public bool IsSuccess { get; set; }
		public string? Error { get; set; }
		public T? Data { get; set; }
	}
}
