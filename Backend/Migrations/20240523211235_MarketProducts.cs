using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class MarketProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Price_PriceId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_markets_MarketId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_products_ProductId",
                table: "Price");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Price",
                table: "Price");

            migrationBuilder.RenameTable(
                name: "Price",
                newName: "prices");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "prices",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "Currency",
                table: "prices",
                newName: "currency");

            migrationBuilder.RenameColumn(
                name: "InvalidatedAt",
                table: "prices",
                newName: "invalidated_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "prices",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_Price_ProductId",
                table: "prices",
                newName: "IX_prices_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Price_MarketId",
                table: "prices",
                newName: "IX_prices_MarketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_prices",
                table: "prices",
                column: "id");

            migrationBuilder.CreateTable(
                name: "available_products",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StoreId = table.Column<int>(type: "integer", nullable: false),
                    MarketId = table.Column<int>(type: "integer", nullable: false),
                    PriceId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_available_products", x => x.id);
                    table.ForeignKey(
                        name: "FK_available_products_markets_MarketId",
                        column: x => x.MarketId,
                        principalTable: "markets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_available_products_prices_PriceId",
                        column: x => x.PriceId,
                        principalTable: "prices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_available_products_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_available_products_stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "stores",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_available_products_MarketId",
                table: "available_products",
                column: "MarketId");

            migrationBuilder.CreateIndex(
                name: "IX_available_products_PriceId",
                table: "available_products",
                column: "PriceId");

            migrationBuilder.CreateIndex(
                name: "IX_available_products_ProductId",
                table: "available_products",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_available_products_StoreId",
                table: "available_products",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_prices_PriceId",
                table: "OrderPosition",
                column: "PriceId",
                principalTable: "prices",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prices_markets_MarketId",
                table: "prices",
                column: "MarketId",
                principalTable: "markets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_prices_products_ProductId",
                table: "prices",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_prices_PriceId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_prices_markets_MarketId",
                table: "prices");

            migrationBuilder.DropForeignKey(
                name: "FK_prices_products_ProductId",
                table: "prices");

            migrationBuilder.DropTable(
                name: "available_products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_prices",
                table: "prices");

            migrationBuilder.RenameTable(
                name: "prices",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "Price",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "currency",
                table: "Price",
                newName: "Currency");

            migrationBuilder.RenameColumn(
                name: "invalidated_at",
                table: "Price",
                newName: "InvalidatedAt");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Price",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "IX_prices_ProductId",
                table: "Price",
                newName: "IX_Price_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_prices_MarketId",
                table: "Price",
                newName: "IX_Price_MarketId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Price",
                table: "Price",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Price_PriceId",
                table: "OrderPosition",
                column: "PriceId",
                principalTable: "Price",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_markets_MarketId",
                table: "Price",
                column: "MarketId",
                principalTable: "markets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_products_ProductId",
                table: "Price",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
