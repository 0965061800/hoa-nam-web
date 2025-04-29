using HoaNam.Framework;

namespace HoaNam.Domain.User.ValuedObject
{
	public class Profile : Value<Profile>
	{
		public string FirstName { get; private set; }
		public string LastName { get; private set; }
		public string AvatarUrl { get; private set; }


		public Profile()
		{
			FirstName = string.Empty;
			LastName = string.Empty;
			AvatarUrl = string.Empty;
		}

		public Profile(string firstName, string lastName, string avatarUrl)
		{
			FirstName = firstName;
			LastName = lastName;
			AvatarUrl = avatarUrl;
		}

		public void Update(string firstName, string lastName, string avatarUrl)
		{
			FirstName = firstName;
			LastName = lastName;
			AvatarUrl = avatarUrl;
		}
	}
}
