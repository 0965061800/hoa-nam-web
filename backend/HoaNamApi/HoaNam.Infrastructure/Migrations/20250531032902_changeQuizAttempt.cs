using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HoaNam.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeQuizAttempt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalQuestion",
                table: "QuizAttempts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalRightAnswer",
                table: "QuizAttempts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "ConcurrencyStamp",
                value: "d09ff985-e9c6-4921-bb64-1471a156e77f");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalQuestion",
                table: "QuizAttempts");

            migrationBuilder.DropColumn(
                name: "TotalRightAnswer",
                table: "QuizAttempts");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "ConcurrencyStamp",
                value: "22379d32-0841-4db5-95b4-1bacd62be9dc");
        }
    }
}
