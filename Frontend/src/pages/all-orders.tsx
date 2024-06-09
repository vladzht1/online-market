import { Button, Callout, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useQueryClient } from "react-query";

import { AddOrderModal } from "../components/features/orders/add-order-modal";
import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { OrdersTable } from "../components/widgets/orders/orders-table";
import { useMessage } from "../hooks/use-message";
import { MessageReceiver } from "../shared/types";

export const AllOrdersPage: FC = () => {
  const queryClient = useQueryClient();

  const { addMessage, getMessages, hasMessages } = useMessage();

  const messageReceiver: MessageReceiver = (message, messageType, success) => {
    if (success) {
      queryClient.invalidateQueries("orders");
    }

    addMessage(message, messageType);
  };

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Flex justify="between" align="center">
          <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
            Все заказы
          </Text>
          <AddOrderModal callback={messageReceiver}>
            <Button variant="ghost">Добавить</Button>
          </AddOrderModal>
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

        <OrdersTable messageReceiver={messageReceiver} />
      </ContainerWithPadding>
    </>
  );
};
