using Dapper;
using HoaNam.Application.Features.TagService.Dto;
using System.Data.Common;

namespace HoaNam.Application.Features.TagService.Queries
{
	public static class TagQueries
	{
		public static async Task<HashSet<TagDtoForListing>> GetAllTag(this DbConnection connection)
		{
			var sql = "SELECT Id, Name, NormalizeName FROM Tags";
			HashSet<TagDtoForListing> products = (await connection.QueryAsync<TagDtoForListing>(sql)).ToHashSet();
			return products;
		}
	}
}
