import { Button, Flex, Heading, HoverCard, Table, Text } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { Link } from "react-router-dom";
import { getOrderById } from "../../../api/orders";
import { Order } from "../../../models/order";
import { getOrderStatusText } from "../../../shared/formatters";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteOrderModal } from "../../features/orders/delete-order-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { LoadingArea } from "../../shared/loading-area";

interface IOrderInfoProps {
  orderId: number;
  redirectBack: () => void;
}

export const OrderInfo: FC<IOrderInfoProps> = ({ orderId, redirectBack }) => {
  const { data, isFetching, isError } = useQuery("single-order", async () => await getOrderById(orderId), {
    keepPreviousData: true,
  });

  const [order, setOrder] = useState<Order | null>(null);

  console.log(order);

  useEffect(() => {
    if (isError) {
      redirectBack();
      return;
    }

    if (data) {
      setOrder(data.data);
      return;
    }
  }, [data, isError, order, redirectBack]);

  const onDelete = () => {
    redirectBack();
  };

  const getTotalPrice = (): { amount: number; currency: string } => {
    const amount =
      order?.productPositions.reduce((previous, current) => previous + current.price.value * current.quantity, 0) || 0;

    const currency = order?.productPositions[0]?.price.currency || "RUB";

    return { amount, currency };
  };

  return (
    <>
      <LoadingArea show={isFetching && !order} />

      {order && (
        <>
          <Flex justify="between" align="center">
            <Heading size="7">Заказ №{order.id}</Heading>
            <Flex gap="2">
              <DeleteOrderModal orderId={order.id} callback={onDelete}>
                <DeleteButton />
              </DeleteOrderModal>
            </Flex>
          </Flex>

          <Text as="div">
            Заказано пользователем: {order.user.firstName} {order.user.middleName} {order.user.lastName}
          </Text>

          <Text as="div">
            Заказ из магазина:
            <Link to={`/markets/${order.market.id}`}>{order.market.name}</Link>
          </Text>

          <Text as="div">Статус заказа: {getOrderStatusText(order.status)}</Text>

          <HoverCard.Root>
            <HoverCard.Trigger style={{ marginTop: "0.5rem" }}>
              <Button variant="soft">Посмотреть адрес доставки</Button>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px">
              <AddressDataList address={order.addressForDelivery} />
            </HoverCard.Content>
          </HoverCard.Root>

          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Продукт</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Цена за штуку</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Количество</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Итого</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {order.productPositions.map((product) => (
                <Table.Row>
                  <Table.RowHeaderCell>{product.id}</Table.RowHeaderCell>
                  <Table.Cell>
                    <Link to={`/products/${product.product.id}`}>{product.product.name}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    {product.price.value} {product.price.currency}
                  </Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>
                    {product.price.value * product.quantity} {product.price.currency}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Flex justify="end" pt="4">
            <Text weight="bold">
              ИТОГО:{" "}
              {(() => {
                const total = getTotalPrice();
                return `${total.amount} ${total.currency}`;
              })()}
            </Text>
          </Flex>
        </>
      )}
    </>
  );
};
