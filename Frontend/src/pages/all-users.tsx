import { Button, Callout, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useQueryClient } from "react-query";

import { AddUserModal } from "../components/features/users/add-user-modal";
import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { UsersTable } from "../components/widgets/users/users-table";
import { useMessage } from "../hooks/useMessage";
import { MessageReceiver } from "../shared/types";

export const AllUsersPage: FC = () => {
  const queryClient = useQueryClient();

  const { addMessage, getMessages, hasMessages } = useMessage();

  const messageReceiver: MessageReceiver = (message, messageType, success) => {
    if (success) {
      queryClient.invalidateQueries("users");
    }

    addMessage(message, messageType);
  };

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Flex justify="between">
          <Text
            size="6"
            as="div"
            weight="medium"
            style={{ marginBottom: "0.5rem" }}
          >
            Все пользователи
          </Text>
          <AddUserModal callback={messageReceiver}>
            <Button variant="outline">Добавить</Button>
          </AddUserModal>
        </Flex>

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

        <UsersTable messageReceiver={messageReceiver} />
      </ContainerWithPadding>
    </>
  );
};
