import { Box, Button, Callout, Dialog, Flex, Tabs } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { createNewStore } from "../../../api/stores";
import { useMessage } from "../../../hooks/use-message";
import { Address } from "../../../models/address";
import { Store } from "../../../models/store";
import { isObjectEmpty } from "../../../shared/object";
import { IActionModalProps } from "../../../shared/types";
import { AddressForm } from "../../entities/address/address-form";
import { StoreForm } from "../../entities/store/store-form";

interface IAddStoreModalProps extends IActionModalProps {}

export const AddStoreModal: FC<IAddStoreModalProps> = ({ children, callback }) => {
  const [storeFormState, setStoreFormState] = useState({} as Store);
  const [addressFormState, setAddressFormState] = useState({} as Address);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async ({ store, address }: { store: Store; address: Address }) => await createNewStore(store, address)
  );

  useEffect(() => {
    if (isSuccess) {
      callback?.("Склад успешно создан!", "SUCCESS", true);
      reset();
      restoreFormState();
    } else if (isError) {
      callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

      reset();
    }
  }, [callback, error, isError, isSuccess, reset]);

  const handleSubmit = () => {
    // TODO: add validation

    // const validationResult = validateStateForm(formState as Store);

    // Object.values(validationResult.errors).forEach((error) => addMessage(error, "ERROR"));

    // if (!validationResult.isValid) {
    //   return;
    // }

    mutate({
      store: storeFormState as Store,
      address: addressFormState as Address,
    });
    setDialogOpen(false);
  };

  const restoreFormState = () => {
    setStoreFormState({} as Store);
    setAddressFormState({} as Address);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Добавление склада</Dialog.Title>

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
              <StoreForm
                initialData={!isObjectEmpty(storeFormState) ? storeFormState : undefined}
                onChange={setStoreFormState}
              />
            </Tabs.Content>
            <Tabs.Content value="address-form">
              <AddressForm
                initialData={!isObjectEmpty(addressFormState) ? addressFormState : undefined}
                onChange={setAddressFormState}
              />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={() => setDialogOpen(false)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Создать</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
