using HoaNam.Application.Common.Models;
using HoaNam.Application.Interfaces.IRepositories;
using HoaNam.Domain.Quiz.Entities;
using HoaNam.Domain.Quiz.ValueObjects;
using HoaNam.Domain.Services.IRepository;
using MediatR;

namespace HoaNam.Application.Features.QuizService.Commands
{
	public class AddQuizHandler : IRequestHandler<AddNewQuizCommand, HandlerResult>
	{
		private readonly IUserRepository _userRepo;
		private readonly IQuizRepository _quizRepo;
		public AddQuizHandler(IUserRepository userRepo, IQuizRepository quizRepo)
		{
			_userRepo = userRepo;
			_quizRepo = quizRepo;
		}
		public async Task<HandlerResult> Handle(AddNewQuizCommand request, CancellationToken cancellationToken)
		{
			bool checkUser = await _userRepo.CheckUserExist(request.UserId);
			if (checkUser == false) throw new Exception("User does not exist");
			QuizTitle newQuizTitle = QuizTitle.FromString(request.Title);
			Quiz newQuiz = new Domain.Quiz.Entities.Quiz(request.Id, newQuizTitle, request.UserId);

			await _quizRepo.AddNewQuiz(newQuiz);

			await _userRepo.SaveChanges();
			return new HandlerResult
			{
				Succeeded = true,
			};
		}
	}
}
