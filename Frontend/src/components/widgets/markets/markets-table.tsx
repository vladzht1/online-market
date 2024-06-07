import { Button, Callout, HoverCard, Table } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { getAllMarkets } from "../../../api/markets";
import { MarketWithAddress } from "../../../models/market";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteMarketModal } from "../../features/markets/delete-market-modal";
import { EditMarketModal } from "../../features/markets/edit-market-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";
import { LoadingArea } from "../../shared/loading-area";

interface IMarketsTableProps {
  messageReceiver?: MessageReceiver;
}

export const MarketsTable: FC<IMarketsTableProps> = ({ messageReceiver }) => {
  const [messageSent, setMessageSent] = useState(false);

  const { data, isFetching, isError, error } = useQuery("markets", async () => await getAllMarkets(), {
    keepPreviousData: true,
  });

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    if (!isFetching && isError && !messageSent) {
      messageReceiver?.((error as any).response?.data?.message || (error as any).message, "ERROR", false);
      setMessageSent(true);
    }
  }, [error, isError, isFetching, messageReceiver, messageSent]);

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
                  <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Описание</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Ссылки</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Адрес</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.data.map((market: MarketWithAddress) => (
                  <Table.Row align="center" key={market.id}>
                    <Table.RowHeaderCell>{market.id}</Table.RowHeaderCell>
                    <Table.Cell>
                      <Link to={`/markets/${market.id}`}>{market.name}</Link>
                    </Table.Cell>
                    <Table.Cell>
                      <span title={market.description}>{market.description.substring(0, 20)}...</span>
                    </Table.Cell>
                    <Table.Cell>{market.links}</Table.Cell>
                    <Table.Cell>
                      {market.officeAddress && (
                        <HoverCard.Root>
                          <HoverCard.Trigger>
                            <Button variant="ghost">Посмотреть адрес</Button>
                          </HoverCard.Trigger>
                          <HoverCard.Content maxWidth="300px">
                            <AddressDataList address={market.officeAddress} />
                          </HoverCard.Content>
                        </HoverCard.Root>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <EditMarketModal market={market} callback={handleAction}>
                        <EditButton />
                      </EditMarketModal>
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteMarketModal marketId={market.id} callback={handleAction}>
                        <DeleteButton />
                      </DeleteMarketModal>
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
              <Callout.Text>Список магазинов пуст</Callout.Text>
            </Callout.Root>
          )}
        </>
      )}
    </>
  );
};
