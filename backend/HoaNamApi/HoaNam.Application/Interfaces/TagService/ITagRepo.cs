namespace HoaNam.Application.Interfaces.TagService
{
	public interface ITagRepo
	{
		public Task<bool> ExistsByName(string name);
		public Task AddNewTag(Domain.Tag.Entities.Tag tag);
		public Task Save();
	}
}
