namespace HoaNam.Domain.Services.IRepository
{
	public interface ITagRepository
	{
		Task<Tag.Entities.Tag?> GetById(Guid tagId);
		Task<bool> ExistsByName(string name);
		Task AddNewTag(Tag.Entities.Tag tag);
		Task Delete(Guid tagId);
		Task Save();
	}
}
