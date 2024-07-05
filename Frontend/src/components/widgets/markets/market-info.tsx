import { Box, Button, Callout, Flex, Heading, HoverCard, Link, Text } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getMarketById } from "../../../api/markets";
import { MarketWithAddress } from "../../../models/market";
import { MessageReceiver } from "../../../shared/types";
import { AddressDataList } from "../../entities/address/address-data-list";
import { DeleteMarketModal } from "../../features/markets/delete-market-modal";
import { EditMarketModal } from "../../features/markets/edit-market-modal";
import { AddProductToMarketModal } from "../../features/products/add-product-to-market-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";
import { LoadingArea } from "../../shared/loading-area";
import { MarketProductsTable } from "../products/market-products-table";

interface IMarketInfoProps {
  marketId: number;
  redirectBack: () => void;
}

export const MarketInfo: FC<IMarketInfoProps> = ({ marketId, redirectBack }) => {
  const { data, isFetching, isError, refetch } = useQuery("single-market", async () => await getMarketById(marketId), {
    keepPreviousData: true,
  });

  const [market, setMarket] = useState<MarketWithAddress | null>(null);

  useEffect(() => {
    if (isError) {
      redirectBack();
      return;
    }

    if (data) {
      setMarket(data.data);
      return;
    }
  }, [data, isError, market, redirectBack]);

  const onUpdate: MessageReceiver = (_, __, success) => {
    if (success) {
      console.log("Refetching data");
      refetch();
    }
  };

  const onDelete = () => {
    redirectBack();
  };

  return (
    <>
      <LoadingArea show={isFetching && !market} />

      {market && (
        <>
          <Flex justify="between" align="center">
            <Heading size="7">{market.name}</Heading>
            <Flex gap="2">
              <EditMarketModal market={market} callback={onUpdate}>
                <EditButton />
              </EditMarketModal>
              <DeleteMarketModal marketId={market.id} callback={onDelete}>
                <DeleteButton />
              </DeleteMarketModal>
            </Flex>
          </Flex>

          <Text>{market.description}</Text>

          <Box mt="2">
            <Text weight="bold" size="4">
              Ссылки
            </Text>
            <Box>
              {market.links
                .split(",")
                .map((link) => link.trim())
                .map((link) => (
                  <Link href={link} target="_blank" key={link}>
                    {link}
                  </Link>
                ))}
            </Box>
          </Box>

          <Box mt="2">
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Button variant="soft">Посмотреть адрес</Button>
              </HoverCard.Trigger>
              <HoverCard.Content maxWidth="300px">
                <AddressDataList address={market.officeAddress} />
              </HoverCard.Content>
            </HoverCard.Root>
          </Box>

          <Box mt="4">
            <Flex justify="between" align="center" mb="1">
              <Text weight="bold" size="4">
                Товары
              </Text>
              <AddProductToMarketModal marketId={marketId} callback={onUpdate}>
                <Button variant="ghost">Добавить товар</Button>
              </AddProductToMarketModal>
            </Flex>

            {market.products && market.products.length > 0 ? (
              <MarketProductsTable products={market.products} refetch={refetch} />
            ) : (
              <Callout.Root color="gray">
                <Callout.Text>Список товаров пуст</Callout.Text>
              </Callout.Root>
            )}
          </Box>
        </>
      )}
    </>
  );
};
