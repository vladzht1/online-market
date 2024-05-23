import { Button, Callout, Dialog, Flex } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";

import { updateProduct } from "../../../api/products";
import { useMessage } from "../../../hooks/use-message";
import { Product } from "../../../models/product";
import { IActionModalProps } from "../../../shared/types";
import { ProductForm } from "../../entities/product/product-form";

interface IEditProductModalProps extends IActionModalProps {
  product: Product;
}

export const EditProductModal: FC<IEditProductModalProps> = ({ children, product, callback }) => {
  const [productFormState, setProductFormState] = useState<Product>(product);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async (product: Product) => await updateProduct(product)
  );

  useEffect(() => {
    setProductFormState(product);
  }, [product]);

  if (isSuccess) {
    callback?.("Продукт успешно обновлён", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);
    reset();
  }

  const handleSubmit = () => {
    mutate(productFormState);
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Редактирование продукта</Dialog.Title>

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

        <ProductForm initialData={productFormState} onChange={setProductFormState as (updatedStore: Product) => void} />

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
