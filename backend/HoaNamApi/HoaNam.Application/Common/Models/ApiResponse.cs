namespace HoaNam.Application.Common.Models
{
	public class ApiResponse<T>
	{
		public bool IsSuccess { get; set; }
		public string? Error { get; set; }
		public T? Data { get; set; }
		public static ApiResponse<T> Success(T data) => new ApiResponse<T> { IsSuccess = true, Data = data };
		public static ApiResponse<T> Fail(string error) => new ApiResponse<T> { IsSuccess = false, Error = error };
	}
}
