using HoaNam.Application.Common.Models;
using MediatR;

namespace HoaNam.Application.Features.Admin.Commands
{
	public record RegisterUserCommand(string Email, string Password) : IRequest<HandlerResult>;
}
