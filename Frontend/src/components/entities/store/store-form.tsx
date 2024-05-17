import { Flex, Text, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";

import { Store } from "../../../models/store";

interface IStoreFormProps {
  children?: ReactNode;
  initialData?: Store;
  onChange?: (updatedStore: Store) => void;
}

export const StoreForm: FC<IStoreFormProps> = ({ children, initialData, onChange }) => {
  const [formState, setFormState] = useState<Store>(
    initialData ?? {
      id: -1,
      label: "",
      capacity: 1,
      loaded: 0,
    }
  );

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  const setValue = (key: keyof Store, value: any) => {
    setFormState({ ...formState, [key]: value });
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Название
          </Text>
          <TextField.Root
            value={formState.label}
            onChange={(event) => setValue("label", event.target.value)}
            placeholder="Название"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Вместимость
          </Text>
          <TextField.Root
            type="number"
            min={1}
            value={formState.capacity}
            onChange={(event) => setValue("capacity", event.target.value)}
            placeholder="Вместимость"
          />
        </label>
      </Flex>

      {children}
    </>
  );
};
