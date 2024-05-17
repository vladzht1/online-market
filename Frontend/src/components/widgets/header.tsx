import { Flex, Text } from "@radix-ui/themes";
import { FC } from "react";

import { LINKS } from "../../constants/links";
import { ContainerWithPadding } from "../shared/container";
import { Link } from "../shared/link";

export const Header: FC = () => {
  return (
    <header style={{ background: "var(--gray-12)", marginBottom: "0.8rem" }}>
      <ContainerWithPadding $paddingTopBottom="1rem">
        <Flex gap="4" align="center">
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            <Text size="7" weight="bold">
              Online Market Dashboard
            </Text>
          </Link>

          {LINKS.map((link) => (
            <Link to={link.href} key={link.label} style={{ color: "var(--gray-1)" }}>
              {link.label}
            </Link>
          ))}
        </Flex>
      </ContainerWithPadding>
    </header>
  );
};
