using HoaNam.Domain.User.ValuedObject;

namespace HoaNam.Domain.User.Entities
{
	public class AppUser
	{
		public Guid Id { get; protected set; }
		public string Email { get; protected set; }
		public Role Role { get; protected set; }
		public Profile Profile { get; protected set; }

		public AppUser(Guid id, string email)
		{
			Id = id;
			Email = email;
			Profile = new Profile();
			Role = Role.User;
		}

		public void UpdateProfile(string fullName, string lastName, string avatar)
		{
			Profile.Update(fullName, lastName, avatar);
		}
	}
}
