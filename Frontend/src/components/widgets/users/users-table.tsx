import { Callout, Flex, IconButton, Spinner, Table } from "@radix-ui/themes";
import { FC, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import { getAllUsers } from "../../../api/users";
import { useMessage } from "../../../hooks/useMessage";
import { MessageType } from "../../../shared/types";
import { DeleteUserModal } from "../../features/users/delete-user-modal";
import { EditUserModal } from "../../features/users/edit-user-modal";

export const UsersTable: FC = () => {
  const { data, isFetching, isError, error } = useQuery(
    "users",
    async () => await getAllUsers()
  );

  const { addMessage, getMessages, hasMessages } = useMessage();

  useEffect(() => {
    if (!isFetching && isError) {
      addMessage(
        (error as any).response?.data?.message || (error as any).message,
        "ERROR"
      );
    }
  }, [error, isError, isFetching]);

  const handleAction = (message: string, messageType: MessageType) => {
    addMessage(message, messageType);
  };

  return (
    <>
      {isFetching && (
        <Flex width="100%" height="200px" align="center" justify="center">
          <Spinner />
        </Flex>
      )}

      {hasMessages() && (
        <Flex direction="column" gap="2" mb="2">
          {getMessages().map((message, index) => (
            <Callout.Root
              color={message.color}
              key={message.message + index}
              role="alert"
            >
              <Callout.Icon>{message.icon}</Callout.Icon>
              <Callout.Text>{message.message}</Callout.Text>
            </Callout.Root>
          ))}
        </Flex>
      )}

      {data && (
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>ФИО</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Логин</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Почта</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Дата регистрации</Table.ColumnHeaderCell>
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
                <Table.Cell>{`${user.firstName} ${user.middleName} ${user.lastName}`}</Table.Cell>
                <Table.Cell>{user.login}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {new Date(user.createdAt).toDateString()}
                </Table.Cell>
                <Table.Cell>
                  {new Date(user.updatedAt).toDateString()}
                </Table.Cell>
                <Table.Cell>
                  <EditUserModal userId={user.id} callback={handleAction}>
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
      )}
    </>
  );
};
