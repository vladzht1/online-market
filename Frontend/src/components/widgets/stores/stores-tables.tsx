import { Button, Callout, HoverCard, Table } from "@radix-ui/themes";
import { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { StoreWithAddress } from "../../../models/store";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteStoreModal } from "../../features/stores/delete-store-modal";
import { EditStoreModal } from "../../features/stores/edit-store-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";
import { LoadingArea } from "../../shared/loading-area";

interface IStoresTableProps {
  stores: StoreWithAddress[];
  isLoading?: boolean;
  messageReceiver?: MessageReceiver;
  refetch?: () => void;
}

export const StoresTable: FC<IStoresTableProps> = ({ stores, messageReceiver, isLoading = false }) => {
  const handleAction = (message: string, messageType: MessageType, success: boolean) => {
    messageReceiver?.(message, messageType, success);
  };

  return (
    <>
      <LoadingArea show={isLoading} />

      <>
        {stores.length > 0 ? (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Адрес</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stores.map((store: StoreWithAddress) => (
                <Table.Row align="center" key={store.id}>
                  <Table.RowHeaderCell>{store.id}</Table.RowHeaderCell>
                  <Table.Cell>{store.label}</Table.Cell>
                  <Table.Cell>
                    {store.address && (
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <Button variant="ghost">Посмотреть адрес</Button>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px">
                          <AddressDataList address={store.address} />
                        </HoverCard.Content>
                      </HoverCard.Root>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <EditStoreModal store={store} callback={handleAction}>
                      <EditButton />
                    </EditStoreModal>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteStoreModal storeId={store.id} callback={handleAction}>
                      <DeleteButton />
                    </DeleteStoreModal>
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
            <Callout.Text>Список складов пуст</Callout.Text>
          </Callout.Root>
        )}
      </>
    </>
  );
};
