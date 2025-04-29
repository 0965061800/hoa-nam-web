namespace HoaNam.Application.Common.Models
{
	public class HandlerResult
	{
		public bool Succeeded { get; set; }
		public string[] Errors { get; set; } = [];
	}
}
