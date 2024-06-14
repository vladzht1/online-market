import { Text, TextField } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { executeQuery2 } from "../../api/queries";
import { ContainerWithPadding } from "../../components/shared/container";
import { Header } from "../../components/widgets/header";
import { OrdersTable } from "../../components/widgets/orders/orders-table";

export const Query2Page: FC = () => {
  const [marketName, setMarketName] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching, refetch } = useQuery(
    "query-2",
    async () => {
      if (shouldFetch) {
        return await executeQuery2(marketName);
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

    if (data?.data && marketName.length === 0) {
      data.data = [];
    }
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
          Заказы
        </Text>
        <Text as="div">Выбрать все заказы, сделанные за последние 2 дня из магазина с названием:</Text>

        <TextField.Root
          placeholder="Введите название магазина"
          onChange={(event) => handleInputChange(event.target.value)}
          value={marketName}
        />

        {data?.data && (
          <OrdersTable isLoading={isFetching && !data?.data} orders={data?.data || []} refetch={refetch} />
        )}
      </ContainerWithPadding>
    </>
  );
};
