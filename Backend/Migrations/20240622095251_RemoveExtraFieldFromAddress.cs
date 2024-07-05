using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveExtraFieldFromAddress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_addresses_markets_market_id",
                table: "addresses");

            migrationBuilder.DropIndex(
                name: "IX_addresses_market_id",
                table: "addresses");

            migrationBuilder.DropColumn(
                name: "market_id",
                table: "addresses");

            migrationBuilder.AddColumn<int>(
                name: "OfficeAddressId",
                table: "markets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_markets_OfficeAddressId",
                table: "markets",
                column: "OfficeAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_markets_addresses_OfficeAddressId",
                table: "markets",
                column: "OfficeAddressId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_markets_addresses_OfficeAddressId",
                table: "markets");

            migrationBuilder.DropIndex(
                name: "IX_markets_OfficeAddressId",
                table: "markets");

            migrationBuilder.DropColumn(
                name: "OfficeAddressId",
                table: "markets");

            migrationBuilder.AddColumn<int>(
                name: "market_id",
                table: "addresses",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_addresses_market_id",
                table: "addresses",
                column: "market_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_addresses_markets_market_id",
                table: "addresses",
                column: "market_id",
                principalTable: "markets",
                principalColumn: "id");
        }
    }
}
