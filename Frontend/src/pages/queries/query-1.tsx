import { Text, TextField } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { executeQuery1 } from "../../api/queries";
import { ContainerWithPadding } from "../../components/shared/container";
import { Header } from "../../components/widgets/header";
import { UsersTable } from "../../components/widgets/users/users-table";

export const Query1Page: FC = () => {
  const [minimalLength, setMinimalLength] = useState(0);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching, refetch } = useQuery(
    "query-1",
    async () => {
      if (shouldFetch) {
        return await executeQuery1(minimalLength);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  const handleInputChange = (value: string) => {
    const numericValue = parseInt(value);
    setMinimalLength(isNaN(numericValue) ? 0 : numericValue);
  };

  useEffect(() => {
    setShouldFetch(minimalLength > 0);
  }, [minimalLength]);

  useEffect(() => {
    if (!isFetching && shouldFetch) {
      refetch();
      setShouldFetch(false);
    }
  }, [isFetching, minimalLength, refetch, shouldFetch]);

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
          Пользователи
        </Text>
        <Text as="div">Выбрать всех пользователей с длиной имени больше N символов</Text>

        <TextField.Root
          placeholder="Введите минимальное количество символов"
          onChange={(event) => handleInputChange(event.target.value)}
          value={minimalLength}
        ></TextField.Root>

        {data?.data && <UsersTable isLoading={isFetching && !data?.data} users={data?.data || []} />}
      </ContainerWithPadding>
    </>
  );
};
