import { Box, Button, Callout, Dialog, Flex, Tabs } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { updateStore } from "../../../api/stores";
import { useMessage } from "../../../hooks/use-message";
import { Address } from "../../../models/address";
import { Store, StoreWithAddress } from "../../../models/store";
import { IActionModalProps } from "../../../shared/types";
import { AddressForm } from "../../entities/address/address-form";
import { StoreForm } from "../../entities/store/store-form";

interface IEditStoreModalProps extends IActionModalProps {
  store: StoreWithAddress;
}

export const EditStoreModal: FC<IEditStoreModalProps> = ({ children, store, callback }) => {
  const [storeFormState, setStoreFormState] = useState<StoreWithAddress>(store);
  const [addressFormState, setAddressFormState] = useState<Address>(store.address ?? {});

  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async (store: StoreWithAddress) => await updateStore(store)
  );

  useEffect(() => {
    // resetForm();
    setStoreFormState(store);
    setAddressFormState(store.address);
  }, [store]);

  if (isSuccess) {
    callback?.("Склад успешно обновлён", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  const handleSubmit = () => {
    // const marketValidationResult = validateMarketForm(storeFormState as Store);
    // const addressValidationResult = validateAddressForm(addressFormState as Address);

    // Object.values({
    //   ...marketValidationResult.errors,
    //   ...addressValidationResult.errors,
    // }).forEach((error) => addMessage(error, "ERROR"));

    // if (!marketValidationResult.isValid || !addressValidationResult.isValid) {
    //   return;
    // }

    store.address = addressFormState;

    mutate(storeFormState);
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Редактирование склада</Dialog.Title>

        {hasMessages() && (
          <Flex direction="column" gap="2" mb="2">
            {getMessages().map((message, index) => (
              <Callout.Root color={message.color} key={message.message + index} role="alert">
                <Callout.Icon>{message.icon}</Callout.Icon>
                <Callout.Text>{message.message}</Callout.Text>
              </Callout.Root>
            ))}
          </Flex>
        )}

        <Tabs.Root defaultValue="store-form">
          <Tabs.List>
            <Tabs.Trigger value="store-form">Общая информация</Tabs.Trigger>
            <Tabs.Trigger value="address-form">Адрес</Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="store-form">
              <StoreForm initialData={storeFormState} onChange={setStoreFormState as (updatedStore: Store) => void} />
            </Tabs.Content>
            <Tabs.Content value="address-form">
              <AddressForm initialData={addressFormState} onChange={setAddressFormState} />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={() => setDialogOpen(false)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
