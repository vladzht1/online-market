using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class FixModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "order_positions",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "address_index",
                table: "addresses",
                newName: "zip_code");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "markets",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128)");

            migrationBuilder.AlterColumn<string>(
                name: "links",
                table: "markets",
                type: "text",
                nullable: false,
                oldClrType: typeof(string[]),
                oldType: "text[]");

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "markets",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(256)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "order_positions",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "zip_code",
                table: "addresses",
                newName: "address_index");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "markets",
                type: "varchar(128)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string[]>(
                name: "links",
                table: "markets",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "markets",
                type: "varchar(256)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
