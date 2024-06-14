import { Button, Callout, Flex, HoverCard, Spinner, Table } from "@radix-ui/themes";
import { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { User } from "../../../models/user";
import { formatDateTimeString } from "../../../shared/formatters";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteUserModal } from "../../features/users/delete-user-modal";
import { EditUserModal } from "../../features/users/edit-user-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";

interface IUserTablePros {
  users: User[];
  isLoading?: boolean;
  messageReceiver?: MessageReceiver;
}

export const UsersTable: FC<IUserTablePros> = ({ users, messageReceiver, isLoading = false }) => {
  const handleAction = (message: string, messageType: MessageType, success: boolean) => {
    messageReceiver?.(message, messageType, success);
  };

  return (
    <>
      {isLoading ? (
        <Flex width="100%" height="200px" align="center" justify="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          {users.length > 0 ? (
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>ФИО</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Логин</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Почта</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Дата регистрации</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Последнее обновление</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Адрес доставки</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user: any) => (
                  <Table.Row align="center" key={user.id}>
                    <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                    <Table.Cell>{`${user.lastName} ${user.firstName} ${user.middleName}`}</Table.Cell>
                    <Table.Cell>{user.login}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell title={user.createdAt}>{formatDateTimeString(user.createdAt)}</Table.Cell>
                    <Table.Cell title={user.updatedAt}>{formatDateTimeString(user.updatedAt)}</Table.Cell>
                    <Table.Cell>
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <Button variant="ghost">Посмотреть адрес</Button>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px">
                          <AddressDataList address={user.deliveryAddress} />
                        </HoverCard.Content>
                      </HoverCard.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <EditUserModal user={user} callback={handleAction}>
                        <EditButton />
                      </EditUserModal>
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteUserModal userId={user.id} callback={handleAction}>
                        <DeleteButton />
                      </DeleteUserModal>
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
              <Callout.Text>Список пользователей пуст</Callout.Text>
            </Callout.Root>
          )}
        </>
      )}
    </>
  );
};
