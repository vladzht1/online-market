import { Text } from "@radix-ui/themes";
import { FC } from "react";

import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { UsersTable } from "../components/widgets/users/users-table";

export const AllUsersPage: FC = () => {
  return (
    <>
      <Header />
      <ContainerWithPadding>
        <Text
          size="6"
          as="div"
          weight="medium"
          style={{ marginBottom: "0.5rem" }}
        >
          Все пользователи
        </Text>
        <UsersTable />
      </ContainerWithPadding>
    </>
  );
};
