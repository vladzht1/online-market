import { Button, Callout, Dialog, Flex } from "@radix-ui/themes";
import { FC, useState } from "react";
import { useMutation } from "react-query";

import { MarketProductRequest, createMarketProduct } from "../../../api/market-product";
import { useMessage } from "../../../hooks/use-message";
import { IActionModalProps } from "../../../shared/types";
import { ProductToMarketForm, ProductToMarketFormContentType } from "../../entities/product/product-to-market-form";

interface IAddProductToMarketModalProps extends IActionModalProps {
  marketId?: number;
}

export const AddProductToMarketModal: FC<IAddProductToMarketModalProps> = ({ children, callback, marketId }) => {
  const [formState, setFormState] = useState<ProductToMarketFormContentType>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async (state: MarketProductRequest) => await createMarketProduct(state)
  );

  if (isSuccess) {
    callback?.("Продукт успешно добавлен в магазин!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  const onDataChanged = (product: ProductToMarketFormContentType) => {
    setFormState(product);
  };

  const handleSubmit = () => {
    mutate(formState as MarketProductRequest);
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Добавление продукта в магазин</Dialog.Title>

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

        <ProductToMarketForm onChange={onDataChanged} initialData={marketId ? { marketId } : {}}>
          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={() => setDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Создать</Button>
          </Flex>
        </ProductToMarketForm>
      </Dialog.Content>
    </Dialog.Root>
  );
};
