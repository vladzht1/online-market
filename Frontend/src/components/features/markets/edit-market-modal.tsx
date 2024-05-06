import { Box, Button, Callout, Dialog, Flex, Tabs } from "@radix-ui/themes";
import { FC, ReactNode, useState } from "react";
import { useMutation } from "react-query";

import { updateMarket } from "../../../api/markets";
import { useMessage } from "../../../hooks/use-message";
import { Address } from "../../../models/address";
import { Market, WithAddress } from "../../../models/market";
import { MessageType } from "../../../shared/types";
import { validateAddressForm } from "../../../validators/address-form-validator";
import { validateMarketForm } from "../../../validators/market-form-validator";
import { AddressForm } from "../../entities/address/address-form";
import { MarketForm } from "../../entities/market/market-form";

interface IEditMarketModalProps {
  children: ReactNode;
  market: Market & WithAddress;
  callback?: (message: string, messageType: MessageType, success: boolean) => void;
}

export const EditMarketModal: FC<IEditMarketModalProps> = ({ children, market, callback }) => {
  const [marketFormState, setMarketFormState] = useState<Market & WithAddress>(market);
  const [addressFormState, setAddressFormState] = useState<Address>(market.officeAddress ?? {});

  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async (market: Market & WithAddress) => await updateMarket(market)
  );

  if (isSuccess) {
    callback?.("Магазин успешно обновлён", "SUCCESS", true);
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

    market.officeAddress = addressFormState;

    mutate(marketFormState);

    setDialogOpen(false);
    resetForm();
  };

  const handleClose = () => {
    setDialogOpen(false);

    // Set initial state to avoid saving changes after the modal was closed
    resetForm();
  };

  const resetForm = () => {
    setMarketFormState(market);
    setAddressFormState(market.officeAddress);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Редактирование магазина</Dialog.Title>

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
                initialData={marketFormState}
                onChange={setMarketFormState as (updatedMarket: Market) => void}
              />
            </Tabs.Content>
            <Tabs.Content value="address-form">
              <AddressForm initialData={addressFormState} onChange={setAddressFormState} />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={handleClose}>
            Отмена
          </Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
