namespace HoaNam.Application.Features.QuizService.Dto
{
	public class PageListResponse<T>
	{
		public int TotalPage { get; set; }
		public int PageIndex { get; set; }
		public int PageSize { get; set; }
		public List<T> Data { get; set; } = new List<T>();
	}
}
