using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStoreSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Stores_StoreId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Stores_StoreId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_Stores_addresses_AddressId",
                table: "Stores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Stores",
                table: "Stores");

            migrationBuilder.RenameTable(
                name: "Stores",
                newName: "stores");

            migrationBuilder.RenameColumn(
                name: "Label",
                table: "stores",
                newName: "label");

            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "stores",
                newName: "capacity");

            migrationBuilder.RenameIndex(
                name: "IX_Stores_AddressId",
                table: "stores",
                newName: "IX_stores_AddressId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_stores",
                table: "stores",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_stores_StoreId",
                table: "Order",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_stores_StoreId",
                table: "OrderPosition",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_stores_addresses_AddressId",
                table: "stores",
                column: "AddressId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_stores_StoreId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_stores_StoreId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_stores_addresses_AddressId",
                table: "stores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_stores",
                table: "stores");

            migrationBuilder.RenameTable(
                name: "stores",
                newName: "Stores");

            migrationBuilder.RenameColumn(
                name: "label",
                table: "Stores",
                newName: "Label");

            migrationBuilder.RenameColumn(
                name: "capacity",
                table: "Stores",
                newName: "Capacity");

            migrationBuilder.RenameIndex(
                name: "IX_stores_AddressId",
                table: "Stores",
                newName: "IX_Stores_AddressId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Stores",
                table: "Stores",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Stores_StoreId",
                table: "Order",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Stores_StoreId",
                table: "OrderPosition",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_addresses_AddressId",
                table: "Stores",
                column: "AddressId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
