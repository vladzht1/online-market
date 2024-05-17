import { Button, Callout, HoverCard, Table } from "@radix-ui/themes";
import { FC, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useQuery } from "react-query";

import { getAllStores } from "../../../api/stores";
import { StoreWithAddress } from "../../../models/store";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteStoreModal } from "../../features/stores/delete-store-modal";
import { EditStoreModal } from "../../features/stores/edit-store-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";
import { LoadingArea } from "../../shared/loading-area";

interface IStoresTableProps {
  messageReceiver?: MessageReceiver;
}

export const StoresTable: FC<IStoresTableProps> = ({ messageReceiver }) => {
  const { data, isFetching, isError, error, remove } = useQuery("stores", async () => await getAllStores(), {
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
                  <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Загруженность</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Адрес</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.data.map((store: StoreWithAddress) => (
                  <Table.Row align="center" key={store.id}>
                    <Table.RowHeaderCell>{store.id}</Table.RowHeaderCell>
                    <Table.Cell>{store.label}</Table.Cell>
                    <Table.Cell>
                      <span title={`${store.loaded} из ${store.capacity}`}>
                        {(store.loaded / store.capacity) * 100}%
                      </span>
                    </Table.Cell>
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
      )}
    </>
  );
};
