using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddressMarket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_markets_addresses_office_address_id",
                table: "markets");

            migrationBuilder.DropIndex(
                name: "IX_markets_office_address_id",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_markets_office_address_id",
                table: "markets",
                column: "office_address_id");

            migrationBuilder.AddForeignKey(
                name: "FK_markets_addresses_office_address_id",
                table: "markets",
                column: "office_address_id",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
