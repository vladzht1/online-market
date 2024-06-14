import { Text, TextField } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { executeQuery4 } from "../../api/queries";
import { ContainerWithPadding } from "../../components/shared/container";
import { Header } from "../../components/widgets/header";
import { ProductsTable } from "../../components/widgets/products/products-table";

export const Query4Page: FC = () => {
  const [marketName, setMarketName] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching, refetch } = useQuery(
    "query-4",
    async () => {
      if (shouldFetch) {
        setShouldFetch(false);
        return await executeQuery4(marketName);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  const handleInputChange = (value: string) => {
    setMarketName(value);
  };

  useEffect(() => {
    setShouldFetch(marketName.length > 0);
  }, [data, marketName]);

  useEffect(() => {
    if (!isFetching && shouldFetch) {
      refetch();
      setShouldFetch(false);
    }
  }, [isFetching, marketName, refetch, shouldFetch]);

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
          Склады
        </Text>
        <Text as="div">Выбрать все товары, купленные из магазина с названием:</Text>

        <TextField.Root
          placeholder="Введите название магазина"
          onChange={(event) => handleInputChange(event.target.value)}
          value={marketName}
        />

        {data?.data && <ProductsTable isLoading={isFetching && !data?.data} products={data?.data || []} />}
      </ContainerWithPadding>
    </>
  );
};
