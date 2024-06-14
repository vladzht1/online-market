import { Button, Callout, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useQuery } from "react-query";

import { getAllUsers } from "../api/users";
import { AddUserModal } from "../components/features/users/add-user-modal";
import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { UsersTable } from "../components/widgets/users/users-table";
import { useMessage } from "../hooks/use-message";
import { MessageReceiver } from "../shared/types";

export const AllUsersPage: FC = () => {
  const { data, isFetching, refetch } = useQuery("users", async () => await getAllUsers(), {
    keepPreviousData: true,
  });

  const { addMessage, getMessages, hasMessages } = useMessage();

  const messageReceiver: MessageReceiver = (message, messageType, success) => {
    if (success) {
      refetch();
    }

    addMessage(message, messageType);
  };

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Flex justify="between" align="center">
          <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
            Все пользователи
          </Text>
          <AddUserModal callback={messageReceiver}>
            <Button variant="ghost">Добавить</Button>
          </AddUserModal>
        </Flex>

        {hasMessages() && (
          <Flex direction="column" gap="2" mb="2">
            {getMessages().map((message, index) => (
              <Callout.Root color={message.color} key={message.message + index} role="alert">
                <Callout.Icon>{message.icon}</Callout.Icon>
                <Callout.Text>{message.message}</Callout.Text>
              </Callout.Root>
            ))}
          </Flex>
        )}

        <UsersTable isLoading={isFetching && !data?.data} users={data?.data || []} messageReceiver={messageReceiver} />
      </ContainerWithPadding>
    </>
  );
};
