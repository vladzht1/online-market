import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FC } from "react";
import { useMutation } from "react-query";

import { deleteStoreById } from "../../../api/stores";
import { IActionModalProps } from "../../../shared/types";

interface IDeleteStoreModalProps extends IActionModalProps {
  storeId: number;
}

export const DeleteStoreModal: FC<IDeleteStoreModalProps> = ({ children, storeId, callback }) => {
  const { mutate, isSuccess, isError, error, reset } = useMutation(async (id: number) => await deleteStoreById(id));

  if (isSuccess) {
    callback?.("Склад успешно удалён!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Удаление склада</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Вы уверены, что хотите удалить этот склад? Отменить это действие будет невозможно!
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
                mutate(storeId);
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
