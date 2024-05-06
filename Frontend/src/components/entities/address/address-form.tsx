import { Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";

import { Address } from "../../../models/address";

interface IAddressFormProps {
  children?: ReactNode;
  initialData?: Address;
  onChange?: (updatedAddress: Address) => void;
}

export const AddressForm: FC<IAddressFormProps> = ({ children, initialData, onChange }) => {
  const [formState, setFormState] = useState<Address>(
    initialData ?? {
      id: -1,
      countryCode: "",
      region: "",
      city: "",
      street: "",
      building: "",
      apartment: "",
      addressIndex: "",
      comment: "",
    }
  );

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  const setValue = (key: keyof Address, value: any) => {
    setFormState({ ...formState, [key]: value });
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Страна
          </Text>
          <TextField.Root
            value={formState.countryCode}
            onChange={(event) => setValue("countryCode", event.target.value)}
            placeholder="Страна"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Регион
          </Text>
          <TextField.Root
            value={formState.region}
            onChange={(event) => setValue("region", event.target.value)}
            placeholder="Регион"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Город
          </Text>
          <TextField.Root
            value={formState.city}
            onChange={(event) => setValue("city", event.target.value)}
            placeholder="Город"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Улица
          </Text>
          <TextField.Root
            value={formState.street}
            onChange={(event) => setValue("street", event.target.value)}
            placeholder="Улица"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Строение
          </Text>
          <TextField.Root
            value={formState.building}
            onChange={(event) => setValue("building", event.target.value)}
            placeholder="Строение"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Квартира
          </Text>
          <TextField.Root
            value={formState.apartment}
            onChange={(event) => setValue("apartment", event.target.value)}
            placeholder="Квартира"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Почтовый индекс
          </Text>
          <TextField.Root
            value={formState.addressIndex}
            onChange={(event) => setValue("addressIndex", event.target.value)}
            placeholder="Почтовый индекс"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Комментарий
          </Text>
          <TextArea
            value={formState.comment}
            onChange={(event) => setValue("comment", event.target.value)}
            placeholder="Комментарий"
          />
        </label>
      </Flex>

      {/* Controls */}
      {children}
    </>
  );
};
