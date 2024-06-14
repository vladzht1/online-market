import { Flex, Text } from "@radix-ui/themes";
import { FC } from "react";

import { Link } from "react-router-dom";
import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";

export const AllQueriesPage: FC = () => {
  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Flex justify="between" align="center">
          <Text size="6" as="div" weight="medium" style={{ marginBottom: "0.5rem" }}>
            Все запросы
          </Text>
        </Flex>

        <Flex direction="column">
          <Link to="/queries/1">Выбрать всех пользователей с длиной имени больше N символов (1 таблица)</Link>
          <Link to="/queries/2">
            Выбрать все заказы, сделанные за последние 2 дня из выбранного магазина (2 таблицы)
          </Link>
          <Link to="/queries/3">Выбрать все склады, на которых хранит товары определённый магазин (2 таблицы)</Link>
          <Link to="/queries/4">Выбрать все товары, купленные из определённого магазина (3 таблицы)</Link>
          <Link to="/queries/5">Выбрать все такие товары, которые лежат на определённом складе (3 таблицы)</Link>
        </Flex>
      </ContainerWithPadding>
    </>
  );
};
