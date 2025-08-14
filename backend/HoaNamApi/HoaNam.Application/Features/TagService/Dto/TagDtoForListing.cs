namespace HoaNam.Application.Features.TagService.Dto
{
	public class TagDtoForListing
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string NormalizeName { get; set; } = string.Empty;
	}
}
