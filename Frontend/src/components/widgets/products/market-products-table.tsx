import { Table } from "@radix-ui/themes";
import { FC } from "react";
import { Link } from "react-router-dom";

import { AvailableProduct } from "../../../models/product";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { DeleteMarketProductModal } from "../../features/products/delete-market-product-modal";
import { DeleteButton } from "../../shared/form/delete-button";

interface IMarketProductsTableProps {
  products: AvailableProduct[];
  refetch?: () => void;
  showMarketName?: boolean;
}

export const MarketProductsTable: FC<IMarketProductsTableProps> = ({ products, refetch, showMarketName }) => {
  const onDelete: MessageReceiver = (message: string, messageType: MessageType, success: boolean) => {
    if (success) {
      refetch?.();
    }
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          {showMarketName && <Table.ColumnHeaderCell>Магазин</Table.ColumnHeaderCell>}
          <Table.ColumnHeaderCell>Название товара</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Описание</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Количество</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Цена</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {products.map((product) => (
          <Table.Row key={product.id} align="center">
            <Table.RowHeaderCell>{product.id}</Table.RowHeaderCell>
            {showMarketName && (
              <Table.Cell>
                {product.market && <Link to={`/markets/${product.market.id}`}>{product.market.name}</Link>}
              </Table.Cell>
            )}
            <Table.Cell>
              <Link to={`/products/${product.product.id}`}>{product.product.name}</Link>
            </Table.Cell>
            <Table.Cell>{product.product.description}</Table.Cell>
            <Table.Cell>{product.quantity}</Table.Cell>
            <Table.Cell>{`${product.price.value} ${product.price.currency}`}</Table.Cell>
            <Table.Cell>
              <DeleteMarketProductModal marketProductId={product.id} callback={onDelete}>
                <DeleteButton />
              </DeleteMarketProductModal>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
