namespace HoaNam.Application.Features.QuizService.Dto
{
	public class FilterSortPagingRequest
	{
		public int PageIndex { get; set; } = 1;
		public int PageSize { get; set; } = 12;
		public Sorting Sorting { get; set; }
		public string? Filter { get; set; }
		public List<Guid> TagIds { get; set; } = new();
	}
}
