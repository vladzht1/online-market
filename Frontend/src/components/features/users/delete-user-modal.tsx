import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FC, ReactNode } from "react";
import { useMutation } from "react-query";

import { deleteUserById } from "../../../api/users";
import { MessageType } from "../../../shared/types";

interface IDeleteUserModalProps {
  children: ReactNode;
  userId: number;
  callback?: (message: string, messageType: MessageType, success: boolean) => void;
}

export const DeleteUserModal: FC<IDeleteUserModalProps> = ({ children, userId, callback }) => {
  const { mutate, isSuccess, isError, error, reset } = useMutation(async (id: number) => await deleteUserById(id));

  if (isSuccess) {
    callback?.("Пользователь успешно удалён!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Удаление пользователя</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Вы уверены, что хотите удалить этого пользователя? Отменить это действие будет невозможно!
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
                mutate(userId);
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
