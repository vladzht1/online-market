import { Button, Callout, HoverCard, Table } from "@radix-ui/themes";
import { FC, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { getAllOrders } from "../../../api/orders";
import { Order } from "../../../models/order";
import { formatDateTimeString, getOrderStatusText } from "../../../shared/formatters";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteOrderModal } from "../../features/orders/delete-order-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { LoadingArea } from "../../shared/loading-area";

interface IOrdersTableProps {
  messageReceiver?: MessageReceiver;
}

export const OrdersTable: FC<IOrdersTableProps> = ({ messageReceiver }) => {
  const { data, isFetching, isError, error, remove } = useQuery("orders", async () => await getAllOrders(), {
    keepPreviousData: true,
  });

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    if (!isFetching && isError) {
      messageReceiver?.((error as any).response?.data?.message || (error as any).message, "ERROR", false);
      remove();
    }
  }, [error, isError, isFetching, messageReceiver, remove]);

  const handleAction = (message: string, messageType: MessageType, success: boolean) => {
    messageReceiver?.(message, messageType, success);
  };

  return (
    <>
      <LoadingArea show={isFetching && !data} />

      {data?.data && (
        <>
          {data.data.length > 0 ? (
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Пользователь</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Адрес доставки</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Магазин</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Статус</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Последнее обновление</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.data.map((order: Order) => (
                  <Table.Row align="center" key={order.id}>
                    <Table.RowHeaderCell>
                      <Link to={`/orders/${order.id}`}>Заказ №{order.id}</Link>
                    </Table.RowHeaderCell>
                    <Table.Cell>{order.user.login}</Table.Cell>
                    <Table.Cell>
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <Button variant="ghost">Посмотреть адрес</Button>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px">
                          <AddressDataList address={order.addressForDelivery} />
                        </HoverCard.Content>
                      </HoverCard.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/markets/${order.market.id}`}>{order.market.name}</Link>
                    </Table.Cell>
                    <Table.Cell>{getOrderStatusText(order.status)}</Table.Cell>
                    <Table.Cell>{formatDateTimeString(order.lastStatusUpdated)}</Table.Cell>
                    <Table.Cell>
                      <DeleteOrderModal orderId={order.id} callback={handleAction}>
                        <DeleteButton />
                      </DeleteOrderModal>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Callout.Root color="gray" role="alert">
              <Callout.Icon>
                <FaInfoCircle />
              </Callout.Icon>
              <Callout.Text>Список заказов пуст</Callout.Text>
            </Callout.Root>
          )}
        </>
      )}
    </>
  );
};
