import { Callout, Flex, IconButton, Spinner, Table } from "@radix-ui/themes";
import { FC, useEffect } from "react";
import { FaInfoCircle, FaPen, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import { getAllUsers } from "../../../api/users";
import { formatDateTimeString } from "../../../shared/formatters";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { DeleteUserModal } from "../../features/users/delete-user-modal";
import { EditUserModal } from "../../features/users/edit-user-modal";

interface IUserTablePros {
  messageReceiver?: MessageReceiver;
}

export const UsersTable: FC<IUserTablePros> = ({ messageReceiver }) => {
  const { data, isFetching, isError, error } = useQuery(
    "users",
    async () => await getAllUsers(),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (!isFetching && isError) {
      messageReceiver?.(
        (error as any).response?.data?.message || (error as any).message,
        "ERROR",
        false
      );
    }
  }, [error, isError, isFetching, messageReceiver]);

  const handleAction = (
    message: string,
    messageType: MessageType,
    success: boolean
  ) => {
    messageReceiver?.(message, messageType, success);
  };

  return (
    <>
      {isFetching && !data && (
        <Flex width="100%" height="200px" align="center" justify="center">
          <Spinner />
        </Flex>
      )}

      {data && (
        <>
          {data.data.length > 0 ? (
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>ФИО</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Логин</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Почта</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    Дата регистрации
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    Последнее обновление
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.data.map((user: any) => (
                  <Table.Row align="center" key={user.id}>
                    <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                    <Table.Cell>{`${user.lastName} ${user.firstName} ${user.middleName}`}</Table.Cell>
                    <Table.Cell>{user.login}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell title={user.createdAt}>
                      {formatDateTimeString(user.createdAt)}
                    </Table.Cell>
                    <Table.Cell title={user.updatedAt}>
                      {formatDateTimeString(user.updatedAt)}
                    </Table.Cell>
                    <Table.Cell>
                      <EditUserModal user={user} callback={handleAction}>
                        <IconButton color="teal" variant="soft">
                          <FaPen />
                        </IconButton>
                      </EditUserModal>
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteUserModal userId={user.id} callback={handleAction}>
                        <IconButton color="red" variant="soft">
                          <FaTrash />
                        </IconButton>
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
