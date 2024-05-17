import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FC } from "react";
import { useMutation } from "react-query";

import { deleteMarketById } from "../../../api/markets";
import { IActionModalProps } from "../../../shared/types";

interface IDeleteMarketModalProps extends IActionModalProps {
  marketId: number;
}

export const DeleteMarketModal: FC<IDeleteMarketModalProps> = ({ children, marketId, callback }) => {
  const { mutate, isSuccess, isError, error, reset } = useMutation(async (id: number) => await deleteMarketById(id));

  if (isSuccess) {
    callback?.("Магазин успешно удалён!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Удаление магазина</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Вы уверены, что хотите удалить этот магазин? Отменить это действие будет невозможно!
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
                mutate(marketId);
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
