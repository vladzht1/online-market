import { Box, Button, Callout, Dialog, Flex, Tabs } from "@radix-ui/themes";
import { FC, ReactNode, useState } from "react";
import { useMutation } from "react-query";

import { createNewMarket } from "../../../api/markets";
import { useMessage } from "../../../hooks/use-message";
import { Address } from "../../../models/address";
import { Market } from "../../../models/market";
import { isObjectEmpty } from "../../../shared/object";
import { MessageType } from "../../../shared/types";
import { validateAddressForm } from "../../../validators/address-form-validator";
import { validateMarketForm } from "../../../validators/market-form-validator";
import { AddressForm } from "../../entities/address/address-form";
import { MarketForm } from "../../entities/market/market-form";

interface IAddMarketModalProps {
  children: ReactNode;
  callback?: (message: string, messageType: MessageType, success: boolean) => void;
}

export const AddMarketModal: FC<IAddMarketModalProps> = ({ children, callback }) => {
  const [marketFormState, setMarketFormState] = useState({} as Market);
  const [addressFormState, setAddressFormState] = useState({} as Address);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async ({ market, address }: { market: Market; address: Address }) => await createNewMarket(market, address)
  );

  if (isSuccess) {
    callback?.("Магазин успешно добавлен", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  const handleSubmit = () => {
    const marketValidationResult = validateMarketForm(marketFormState as Market);
    const addressValidationResult = validateAddressForm(addressFormState as Address);

    Object.values({
      ...marketValidationResult.errors,
      ...addressValidationResult.errors,
    }).forEach((error) => addMessage(error, "ERROR"));

    if (!marketValidationResult.isValid || !addressValidationResult.isValid) {
      return;
    }

    mutate({
      market: marketFormState as Market,
      address: addressFormState as Address,
    });
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Добавление магазина</Dialog.Title>

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

        <Tabs.Root defaultValue="market-form">
          <Tabs.List>
            <Tabs.Trigger value="market-form">Общая информация</Tabs.Trigger>
            <Tabs.Trigger value="address-form">Адрес офиса</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="market-form">
              <MarketForm
                initialData={!isObjectEmpty(marketFormState) ? marketFormState : undefined}
                onChange={setMarketFormState}
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
