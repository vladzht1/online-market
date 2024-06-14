import { Button, Callout, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useQuery } from "react-query";

import { getAllStores } from "../api/stores";
import { AddStoreModal } from "../components/features/stores/add-store-modal";
import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { StoresTable } from "../components/widgets/stores/stores-tables";
import { useMessage } from "../hooks/use-message";
import { MessageReceiver } from "../shared/types";

export const AllStoresPage: FC = () => {
  const { data, isFetching, refetch, remove } = useQuery("stores", async () => await getAllStores(), {
    keepPreviousData: true,
  });

  const { addMessage, getMessages, hasMessages } = useMessage();

  const messageReceiver: MessageReceiver = (message, messageType, success) => {
    if (success) {
      remove();
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
            Все склады
          </Text>
          <AddStoreModal callback={messageReceiver}>
            <Button variant="ghost">Добавить</Button>
          </AddStoreModal>
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

        <StoresTable
          stores={data?.data || []}
          isLoading={isFetching && !data?.data}
          messageReceiver={messageReceiver}
        />
      </ContainerWithPadding>
    </>
  );
};
