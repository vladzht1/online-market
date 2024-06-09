import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FC } from "react";
import { useMutation } from "react-query";

import { deleteOrderById } from "../../../api/orders";
import { IActionModalProps } from "../../../shared/types";

interface IDeleteOrderModalProps extends IActionModalProps {
  orderId: number;
}

export const DeleteOrderModal: FC<IDeleteOrderModalProps> = ({ children, orderId, callback }) => {
  const { mutate, isSuccess, isError, error, reset } = useMutation(async (id: number) => await deleteOrderById(id));

  if (isSuccess) {
    callback?.("Заказ успешно удалён!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Удаление заказа</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Вы уверены, что хотите удалить этот заказ? Отменить это действие будет невозможно!
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Отмена
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              onClick={() => {
                mutate(orderId);
              }}
              variant="solid"
              color="red"
            >
              Удалить
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
