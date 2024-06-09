import { Button, Callout, Dialog, Flex } from "@radix-ui/themes";
import { FC, useState } from "react";
import { useMutation } from "react-query";

import { createNewOrder } from "../../../api/orders";
import { useMessage } from "../../../hooks/use-message";
import { User } from "../../../models/user";
import { IActionModalProps } from "../../../shared/types";
import { OrderForm, OrderPositionType } from "../../entities/order/order-form";

interface IAddOrderModalProps extends IActionModalProps {}

export const AddOrderModal: FC<IAddOrderModalProps> = ({ children, callback }) => {
  const [formState, setFormState] = useState<{ products: OrderPositionType[]; userId: number }>({
    products: [],
    userId: -1,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { getMessages, hasMessages } = useMessage();

  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async ({ products, userId }: { products: OrderPositionType[]; userId: number }) =>
      await createNewOrder(products, userId)
  );

  if (isSuccess) {
    callback?.("Заказ успешно создан!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  const onDataChanged = (products: OrderPositionType[], user: User | null) => {
    setFormState({ products, userId: user?.id || formState.userId });
  };

  const handleSubmit = () => {
    mutate(formState);
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title>Добавление заказа</Dialog.Title>

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

        <OrderForm onChange={onDataChanged}>
          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={() => setDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Создать</Button>
          </Flex>
        </OrderForm>
      </Dialog.Content>
    </Dialog.Root>
  );
};
