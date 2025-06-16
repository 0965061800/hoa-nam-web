namespace HoaNamApi.Dtos.Attempt
{
	public class AttemptRequestDto
	{
		public Guid QuizId { get; set; }
		public int TotalQuestion { get; set; }
		public int TotalRightAnswer { get; set; }
	}
}
