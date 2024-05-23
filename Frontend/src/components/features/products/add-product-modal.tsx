import { Button, Callout, Dialog, Flex } from "@radix-ui/themes";
import { FC, useState } from "react";
import { useMutation } from "react-query";

import { createNewProduct } from "../../../api/products";
import { useMessage } from "../../../hooks/use-message";
import { Product } from "../../../models/product";
import { IActionModalProps } from "../../../shared/types";
import { ProductForm } from "../../entities/product/product-form";

interface IAddProductModalProps extends IActionModalProps {}

export const AddProductModal: FC<IAddProductModalProps> = ({ children, callback }) => {
  const [formState, setFormState] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async (product: Product) => await createNewProduct(product)
  );

  if (isSuccess) {
    callback?.("Продукт успешно создан!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  const onDataChanged = (product: Product) => {
    setFormState(product);
  };

  const handleSubmit = () => {
    mutate(formState as Product);
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Добавление продукта</Dialog.Title>

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

        <ProductForm onChange={onDataChanged}>
          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={() => setDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Создать</Button>
          </Flex>
        </ProductForm>
      </Dialog.Content>
    </Dialog.Root>
  );
};
