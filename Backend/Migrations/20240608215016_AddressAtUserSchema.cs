using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddressAtUserSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_order_positions_stores_StoreId",
                table: "order_positions");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_stores_StoreId",
                table: "orders");

            migrationBuilder.DropIndex(
                name: "IX_orders_StoreId",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "orders");

            migrationBuilder.AddColumn<int>(
                name: "DeliveryAddressId",
                table: "users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "order_positions",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_DeliveryAddressId",
                table: "users",
                column: "DeliveryAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_order_positions_stores_StoreId",
                table: "order_positions",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_users_addresses_DeliveryAddressId",
                table: "users",
                column: "DeliveryAddressId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_order_positions_stores_StoreId",
                table: "order_positions");

            migrationBuilder.DropForeignKey(
                name: "FK_users_addresses_DeliveryAddressId",
                table: "users");

            migrationBuilder.DropIndex(
                name: "IX_users_DeliveryAddressId",
                table: "users");

            migrationBuilder.DropColumn(
                name: "DeliveryAddressId",
                table: "users");

            migrationBuilder.AddColumn<int>(
                name: "StoreId",
                table: "orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "order_positions",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_orders_StoreId",
                table: "orders",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_order_positions_stores_StoreId",
                table: "order_positions",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_stores_StoreId",
                table: "orders",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
