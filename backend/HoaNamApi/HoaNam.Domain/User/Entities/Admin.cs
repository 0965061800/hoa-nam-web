using HoaNam.Domain.User.ValuedObject;

namespace HoaNam.Domain.User.Entities
{
	public class Admin : AppUser
	{
		public Admin(Guid id, string email) : base(id, email)
		{
			Id = id;
			Email = email;
			Profile = new Profile();
			Role = Role.Admin;
		}

		public void BanUser(AppUser user)
		{
			// Ban logic
		}
	}
}
