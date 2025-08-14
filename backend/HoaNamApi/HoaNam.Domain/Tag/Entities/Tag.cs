using HoaNam.Domain.Tag.Event;
using HoaNam.Framework;

namespace HoaNam.Domain.Tag.Entities
{
	public class Tag : Entity<Guid>
	{
		public Guid Id { get; private set; }
		public string Name { get; private set; } = string.Empty;
		public string NormalizeName { get; private set; } = string.Empty;
		public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
		public DateTime UpdatedAt { get; private set; } = DateTime.UtcNow;
		public Tag(string name) => Apply(new Event.TagEvent.TagCreated
		{
			Id = Guid.NewGuid(),
			Name = name,
			NormalizeName = name.ToLowerInvariant().Replace(" ", "")
		});

		protected override void When(object @event)
		{
			switch (@event)
			{
				case TagEvent.TagCreated e:
					Id = e.Id;
					Name = e.Name;
					NormalizeName = e.NormalizeName;
					CreatedAt = DateTime.UtcNow;
					UpdatedAt = DateTime.UtcNow;
					break;
			}
		}

		protected override void EnsureValidState()
		{
			//do nothing now :>
		}
	}
}
