using HoaNam.Application.Common.Models;
using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.ValueObjects;
using HoaNam.Domain.Services;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class AddQuizHandler : IRequestHandler<AddNewQuiz, ApiResponse<Unit>>
	{
		private readonly IUserRepository _userRepo;
		private readonly IQuizRepository _quizRepo;
		private readonly ITagRepository _tagRepo;
		public AddQuizHandler(IUserRepository userRepo, IQuizRepository quizRepo, ITagRepository tagRepo)
		{
			_userRepo = userRepo;
			_quizRepo = quizRepo;
			_tagRepo = tagRepo;
		}
		public async Task<ApiResponse<Unit>> Handle(AddNewQuiz request, CancellationToken cancellationToken)
		{
			bool checkUser = await _userRepo.CheckUserExist(request.UserId);
			if (checkUser == false) throw new Exception("User does not exist");
			QuizTitle newQuizTitle = QuizTitle.FromString(request.Title);
			Quiz newQuiz = new Quiz(Guid.NewGuid(), newQuizTitle, request.UserId, request.IsShuffled, request.TimeToPlay);
			foreach (var questionDto in request.Questions)
			{
				Guid newId = Guid.NewGuid();
				newQuiz.AddQuestion(newId, questionDto.Content, questionDto.QuestionType);
				List<Choice> choices = new List<Choice>();
				foreach (var choice in questionDto.Choices)
				{
					Choice newChoice = new Choice(Guid.NewGuid(), choice.Content, choice.IsCorrect, newId);
					choices.Add(newChoice);
				}
				newQuiz.AddChoicesForQuestion(newId, choices);
			}

			var domainService = new QuizTaggingService(_quizRepo, _tagRepo);

			await domainService.TaggingTheNewQuiz(newQuiz, request.TagIds);

			await _quizRepo.AddNewQuiz(newQuiz);

			await _quizRepo.Save();

			return ApiResponse<Unit>.Success(Unit.Value);

		}
	}
}
