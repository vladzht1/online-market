import { Flex, Text, TextField } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";

import { PriceType } from "./product-to-market-form";

interface IPriceForm {
  initialValue?: PriceType;
  onChange?: (value: PriceType) => void;
}

export const PriceForm: FC<IPriceForm> = ({ initialValue, onChange }) => {
  const [formState, setFormState] = useState<PriceType>(
    initialValue || {
      value: 0,
      currency: "RUB",
    }
  );

  const setField = <T extends keyof PriceType, K extends PriceType[T]>(key: T, value: K) => {
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  return (
    <>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Цена
        </Text>
        <Flex gap="1" width="100%" flexGrow="1">
          <TextField.Root
            value={formState.value}
            placeholder="Цена"
            onChange={(event) => {
              const value = parseInt(event.target.value);

              if (isNaN(value)) {
                setField("value", 0);
                return;
              }

              setField("value", value);
            }}
          />
          <TextField.Root
            value={formState.currency}
            placeholder="Валюта"
            onChange={(event) => setField("currency", event.target.value)}
          />
        </Flex>
      </label>
    </>
  );
};
