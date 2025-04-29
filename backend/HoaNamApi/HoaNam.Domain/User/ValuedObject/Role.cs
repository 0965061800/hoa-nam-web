using HoaNam.Framework;

namespace HoaNam.Domain.User.ValuedObject
{
	public class Role : Value<Role>
	{
		public static readonly Role User = new("User");
		public static readonly Role Admin = new("Admin");
		public static readonly Role Staff = new("Staff");

		public string Name { get; }

		private Role(string name)
		{
			Name = name;
		}

		public static Role From(string name)
		{
			return name switch
			{
				"User" => User,
				"Admin" => Admin,
				"Staff" => Staff,
				_ => throw new ArgumentException($"Invalid role name: {name}")
			};
		}

		public static implicit operator string(Role role) => role.Name;
		public static implicit operator Role(string roleName) => From(roleName);
	}
}
