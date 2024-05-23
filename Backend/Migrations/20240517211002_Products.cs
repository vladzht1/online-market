using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Products : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Product_ProductId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_Product_ProductId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductProperty_Product_ProductId",
                table: "ProductProperty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductProperty",
                table: "ProductProperty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Images",
                table: "Product");

            migrationBuilder.RenameTable(
                name: "ProductProperty",
                newName: "product_properties");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "products");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "product_properties",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "product_properties",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "product_properties",
                newName: "product_id");

            migrationBuilder.RenameIndex(
                name: "IX_ProductProperty_ProductId",
                table: "product_properties",
                newName: "IX_product_properties_product_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "products",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "products",
                newName: "description");

            migrationBuilder.AddPrimaryKey(
                name: "PK_product_properties",
                table: "product_properties",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_products",
                table: "products",
                column: "id");

            migrationBuilder.CreateTable(
                name: "product_images",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    url = table.Column<string>(type: "text", nullable: false),
                    product_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product_images", x => x.id);
                    table.ForeignKey(
                        name: "FK_product_images_products_product_id",
                        column: x => x.product_id,
                        principalTable: "products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_product_images_product_id",
                table: "product_images",
                column: "product_id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_products_ProductId",
                table: "OrderPosition",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_products_ProductId",
                table: "Price",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_product_properties_products_product_id",
                table: "product_properties",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_products_ProductId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Price_products_ProductId",
                table: "Price");

            migrationBuilder.DropForeignKey(
                name: "FK_product_properties_products_product_id",
                table: "product_properties");

            migrationBuilder.DropTable(
                name: "product_images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_products",
                table: "products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_product_properties",
                table: "product_properties");

            migrationBuilder.RenameTable(
                name: "products",
                newName: "Product");

            migrationBuilder.RenameTable(
                name: "product_properties",
                newName: "ProductProperty");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Product",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Product",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "ProductProperty",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "ProductProperty",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "ProductProperty",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_product_properties_product_id",
                table: "ProductProperty",
                newName: "IX_ProductProperty_ProductId");

            migrationBuilder.AddColumn<string[]>(
                name: "Images",
                table: "Product",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductProperty",
                table: "ProductProperty",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Product_ProductId",
                table: "OrderPosition",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Price_Product_ProductId",
                table: "Price",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProperty_Product_ProductId",
                table: "ProductProperty",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
