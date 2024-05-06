import { Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";

import { Market } from "../../../models/market";

interface IMarketFormProps {
  children?: ReactNode;
  initialData?: Market;
  onChange?: (updatedMarket: Market) => void;
}

export const MarketForm: FC<IMarketFormProps> = ({ children, initialData, onChange }) => {
  const [formState, setFormState] = useState<Market>(
    initialData ?? {
      id: -1,
      name: "",
      description: "",
      links: [],
    }
  );

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  const setValue = (key: keyof Market, value: any) => {
    setFormState({ ...formState, [key]: value });
  };

  const normalizeLinksString = (links: string): string[] => {
    return links.split("\n").map((link) => link.trim());
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Название
          </Text>
          <TextField.Root
            value={formState.name}
            onChange={(event) => setValue("name", event.target.value)}
            placeholder="Название"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Описание
          </Text>
          <TextArea
            value={formState.description}
            onChange={(event) => setValue("description", event.target.value)}
            placeholder="Описание"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Ссылки
          </Text>
          <TextField.Root
            value={formState.links.join("\n")}
            onChange={(event) => setValue("links", normalizeLinksString(event.target.value))}
            placeholder="Ссылки"
          />
        </label>
      </Flex>

      {children}
    </>
  );
};
