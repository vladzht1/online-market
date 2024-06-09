using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Orders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_addresses_AddressForDeliveryId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_markets_MarketId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_stores_StoreId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_users_UserId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_prices_PriceId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_products_ProductId",
                table: "OrderPosition");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderPosition_stores_StoreId",
                table: "OrderPosition");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderPosition",
                table: "OrderPosition");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.RenameTable(
                name: "OrderPosition",
                newName: "order_positions");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "orders");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "order_positions",
                newName: "order_id");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPosition_StoreId",
                table: "order_positions",
                newName: "IX_order_positions_StoreId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPosition_ProductId",
                table: "order_positions",
                newName: "IX_order_positions_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPosition_PriceId",
                table: "order_positions",
                newName: "IX_order_positions_PriceId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderPosition_OrderId",
                table: "order_positions",
                newName: "IX_order_positions_order_id");

            migrationBuilder.RenameColumn(
                name: "LastStatusUpdated",
                table: "orders",
                newName: "last_status_update_at");

            migrationBuilder.RenameColumn(
                name: "DeliveredAt",
                table: "orders",
                newName: "delivered_at");

            migrationBuilder.RenameIndex(
                name: "IX_Order_UserId",
                table: "orders",
                newName: "IX_orders_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_StoreId",
                table: "orders",
                newName: "IX_orders_StoreId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_MarketId",
                table: "orders",
                newName: "IX_orders_MarketId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_AddressForDeliveryId",
                table: "orders",
                newName: "IX_orders_AddressForDeliveryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_order_positions",
                table: "order_positions",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orders",
                table: "orders",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_order_positions_orders_order_id",
                table: "order_positions",
                column: "order_id",
                principalTable: "orders",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_positions_prices_PriceId",
                table: "order_positions",
                column: "PriceId",
                principalTable: "prices",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_positions_products_ProductId",
                table: "order_positions",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_positions_stores_StoreId",
                table: "order_positions",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_addresses_AddressForDeliveryId",
                table: "orders",
                column: "AddressForDeliveryId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_markets_MarketId",
                table: "orders",
                column: "MarketId",
                principalTable: "markets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_stores_StoreId",
                table: "orders",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_users_UserId",
                table: "orders",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_order_positions_orders_order_id",
                table: "order_positions");

            migrationBuilder.DropForeignKey(
                name: "FK_order_positions_prices_PriceId",
                table: "order_positions");

            migrationBuilder.DropForeignKey(
                name: "FK_order_positions_products_ProductId",
                table: "order_positions");

            migrationBuilder.DropForeignKey(
                name: "FK_order_positions_stores_StoreId",
                table: "order_positions");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_addresses_AddressForDeliveryId",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_markets_MarketId",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_stores_StoreId",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_users_UserId",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orders",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_order_positions",
                table: "order_positions");

            migrationBuilder.RenameTable(
                name: "orders",
                newName: "Order");

            migrationBuilder.RenameTable(
                name: "order_positions",
                newName: "OrderPosition");

            migrationBuilder.RenameColumn(
                name: "last_status_update_at",
                table: "Order",
                newName: "LastStatusUpdated");

            migrationBuilder.RenameColumn(
                name: "delivered_at",
                table: "Order",
                newName: "DeliveredAt");

            migrationBuilder.RenameIndex(
                name: "IX_orders_UserId",
                table: "Order",
                newName: "IX_Order_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_orders_StoreId",
                table: "Order",
                newName: "IX_Order_StoreId");

            migrationBuilder.RenameIndex(
                name: "IX_orders_MarketId",
                table: "Order",
                newName: "IX_Order_MarketId");

            migrationBuilder.RenameIndex(
                name: "IX_orders_AddressForDeliveryId",
                table: "Order",
                newName: "IX_Order_AddressForDeliveryId");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "OrderPosition",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_order_positions_StoreId",
                table: "OrderPosition",
                newName: "IX_OrderPosition_StoreId");

            migrationBuilder.RenameIndex(
                name: "IX_order_positions_ProductId",
                table: "OrderPosition",
                newName: "IX_OrderPosition_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_order_positions_PriceId",
                table: "OrderPosition",
                newName: "IX_OrderPosition_PriceId");

            migrationBuilder.RenameIndex(
                name: "IX_order_positions_order_id",
                table: "OrderPosition",
                newName: "IX_OrderPosition_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderPosition",
                table: "OrderPosition",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_addresses_AddressForDeliveryId",
                table: "Order",
                column: "AddressForDeliveryId",
                principalTable: "addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_markets_MarketId",
                table: "Order",
                column: "MarketId",
                principalTable: "markets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_stores_StoreId",
                table: "Order",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_users_UserId",
                table: "Order",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_Order_OrderId",
                table: "OrderPosition",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_prices_PriceId",
                table: "OrderPosition",
                column: "PriceId",
                principalTable: "prices",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_products_ProductId",
                table: "OrderPosition",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderPosition_stores_StoreId",
                table: "OrderPosition",
                column: "StoreId",
                principalTable: "stores",
                principalColumn: "id");
        }
    }
}
