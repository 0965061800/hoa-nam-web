using HoaNam.Domain.Services.IRepository;
using HoaNam.Domain.Tag.Entities;
using HoaNam.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace HoaNam.Infrastructure.Repositories.TagRepository
{
	public class TagCommandRepository : ITagRepository
	{
		public readonly AppDbContext _context;
		public TagCommandRepository(AppDbContext context)
		{
			_context = context;
		}


		public async Task AddNewTag(Tag tag)
		{
			await _context.Tags.AddAsync(tag);
		}

		public Task Delete(Guid tagId)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> ExistsByName(string normalizeName)
		{
			var result = await _context.Tags.AnyAsync(t => t.NormalizeName == normalizeName);
			return result;
		}

		public Task<Tag?> GetById(Guid tagId)
		{
			var result = _context.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
			if (result == null)
			{
				throw new Exception("this tag_Id not exist");
			}
			return result;
		}

		public async Task Save()
		{
			await _context.SaveChangesAsync();
		}
	}
}
