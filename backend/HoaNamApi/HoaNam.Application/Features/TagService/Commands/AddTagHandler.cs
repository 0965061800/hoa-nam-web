using HoaNam.Application.Common.Models;
using HoaNam.Domain.Services.IRepository;
using HoaNam.Domain.Tag.Entities;
using MediatR;

namespace HoaNam.Application.Features.TagService.Commands
{
	public class AddTagCommand : IRequest<ApiResponse<Unit>>
	{
		public string Name { get; set; } = string.Empty;
	}
	public class AddTagHandler : IRequestHandler<AddTagCommand, ApiResponse<Unit>>
	{
		public ITagRepository _tagRepo { get; set; }
		public AddTagHandler(ITagRepository tagRepo)
		{
			_tagRepo = tagRepo;
		}

		public async Task<ApiResponse<Unit>> Handle(AddTagCommand request, CancellationToken cancellationToken)
		{
			var normalizeName = request.Name.ToLowerInvariant().Replace(" ", "");
			var taskExist = await _tagRepo.ExistsByName(normalizeName);
			if (taskExist)
			{
				return ApiResponse<Unit>.Fail("Tag already exists");
			}
			Tag newTag = new Tag(request.Name);
			try
			{
				await _tagRepo.AddNewTag(newTag);
				await _tagRepo.Save();
				return ApiResponse<Unit>.Success(Unit.Value);
			}
			catch (Exception ex)
			{
				return ApiResponse<Unit>.Fail(ex.Message);
			}
		}
	}
}
