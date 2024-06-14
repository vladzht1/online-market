import { Text, TextField } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { executeQuery5 } from "../../api/queries";
import { ContainerWithPadding } from "../../components/shared/container";
import { Header } from "../../components/widgets/header";
import { ProductsTable } from "../../components/widgets/products/products-table";

export const Query5Page: FC = () => {
  const [storeName, setStoreName] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching, refetch } = useQuery(
    "query-5",
    async () => {
      if (shouldFetch) {
        setShouldFetch(false);
        return await executeQuery5(storeName);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  const handleInputChange = (value: string) => {
    setStoreName(value);
  };

  useEffect(() => {
    setShouldFetch(storeName.length > 0);
  }, [data, storeName]);

  useEffect(() => {
    if (!isFetching && shouldFetch) {
      refetch();
      setShouldFetch(false);
    }
  }, [isFetching, storeName, refetch, shouldFetch]);

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
          Склады
        </Text>
        <Text as="div">Выбрать все товары, которые лежат на складе с названием:</Text>

        <TextField.Root
          placeholder="Введите название склада"
          onChange={(event) => handleInputChange(event.target.value)}
          value={storeName}
        />

        {data?.data && <ProductsTable isLoading={isFetching && !data?.data} products={data?.data || []} />}
      </ContainerWithPadding>
    </>
  );
};
