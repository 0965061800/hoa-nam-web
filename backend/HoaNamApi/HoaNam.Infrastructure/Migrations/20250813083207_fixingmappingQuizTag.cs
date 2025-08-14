using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HoaNam.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class fixingmappingQuizTag : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizTags_Tags_QuizId",
                table: "QuizTags");

            migrationBuilder.AddColumn<Guid>(
                name: "QuizId1",
                table: "QuizTags",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "ConcurrencyStamp",
                value: "8c055a7e-58ef-4320-92ba-8de4fb6ba51e");

            migrationBuilder.CreateIndex(
                name: "IX_QuizTags_QuizId1",
                table: "QuizTags",
                column: "QuizId1");

            migrationBuilder.CreateIndex(
                name: "IX_QuizTags_TagId",
                table: "QuizTags",
                column: "TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizTags_Quizzes_QuizId1",
                table: "QuizTags",
                column: "QuizId1",
                principalTable: "Quizzes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizTags_Tags_TagId",
                table: "QuizTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizTags_Quizzes_QuizId1",
                table: "QuizTags");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizTags_Tags_TagId",
                table: "QuizTags");

            migrationBuilder.DropIndex(
                name: "IX_QuizTags_QuizId1",
                table: "QuizTags");

            migrationBuilder.DropIndex(
                name: "IX_QuizTags_TagId",
                table: "QuizTags");

            migrationBuilder.DropColumn(
                name: "QuizId1",
                table: "QuizTags");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                column: "ConcurrencyStamp",
                value: "918f3569-a606-46d5-bf8e-febad89e9a6c");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizTags_Tags_QuizId",
                table: "QuizTags",
                column: "QuizId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
