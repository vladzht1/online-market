import { Button, Flex, Text } from "@radix-ui/themes";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { HEADER_LINKS } from "../constants/links";

export const HomePage: FC = () => {
  const router = useNavigate();

  const redirectToTable = (href: string) => {
    console.log("Redirect to", href);
    return router(href);
  };

  return (
    <>
      <Header />
      <ContainerWithPadding>
        <div>
          <Text as="div" size="7">
            Добро пожаловать!
          </Text>
          Пожалуйста, выберите таблицу и перейдите по соответствующей ссылке:
          <Flex gap="4" my="4">
            {HEADER_LINKS.map((link) => (
              <Button
                onClick={() => redirectToTable(link.href)}
                key={link.label}
              >
                {link.label}
              </Button>
            ))}
          </Flex>
        </div>
      </ContainerWithPadding>
    </>
  );
};
