using HoaNam.Domain.Services.IRepository;

namespace HoaNam.Domain.Services
{
	public class QuizTaggingService
	{
		private readonly IQuizRepository _quizRepository;
		private readonly ITagRepository _tagRepository;
		public QuizTaggingService(IQuizRepository quizRepository, ITagRepository tagRepository)
		{
			_quizRepository = quizRepository;
			_tagRepository = tagRepository;
		}

		public async Task TaggingTheNewQuiz(Quiz.Entities.Quiz newQuiz, List<Guid> tagIds)
		{
			foreach (var tagId in tagIds)
			{
				var tag = await _tagRepository.GetById(tagId);
				if (tag == null)
				{
					throw new Exception($"Tag with ID {tagId} does not exist.");
				}
				newQuiz.AddTag(tagId);
			}
		}
	}
}
