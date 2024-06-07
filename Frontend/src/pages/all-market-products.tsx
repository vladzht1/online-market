import { Button, Callout, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useQuery, useQueryClient } from "react-query";

import { getAllMarketProducts } from "../api/market-product";
import { AddProductToMarketModal } from "../components/features/products/add-product-to-market-modal";
import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { MarketProductsTable } from "../components/widgets/products/market-products-table";
import { useMessage } from "../hooks/use-message";
import { MessageReceiver } from "../shared/types";

export const AllMarketProductsPage: FC = () => {
  const queryClient = useQueryClient();
  const { addMessage, getMessages, hasMessages } = useMessage();

  const { data } = useQuery("market-products", async () => await getAllMarketProducts(), {
    keepPreviousData: true,
  });

  const messageReceiver: MessageReceiver = (message, messageType, success) => {
    if (success) {
      invalidateData();
    }

    addMessage(message, messageType);
  };

  const invalidateData = () => {
    queryClient.invalidateQueries("market-products");
  };

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Flex justify="between" align="center">
          <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
            Все продукты
          </Text>
          <AddProductToMarketModal callback={messageReceiver}>
            <Button variant="ghost">Добавить товар</Button>
          </AddProductToMarketModal>
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

        <MarketProductsTable products={data?.data ?? []} showMarketName={true} refetch={invalidateData} />
      </ContainerWithPadding>
    </>
  );
};
