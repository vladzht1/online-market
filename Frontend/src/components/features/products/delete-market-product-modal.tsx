import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FC } from "react";
import { useMutation } from "react-query";

import { deleteMarketProductById } from "../../../api/market-product";
import { IActionModalProps } from "../../../shared/types";

interface IDeleteMarketProductModalProps extends IActionModalProps {
  marketProductId: number;
}

export const DeleteMarketProductModal: FC<IDeleteMarketProductModalProps> = ({
  marketProductId,
  callback,
  children,
}) => {
  const { mutate, isSuccess, isError, error, reset } = useMutation(
    async (id: number) => await deleteMarketProductById(id)
  );

  if (isSuccess) {
    callback?.("Продукт успешно удалён из магазина!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Удаление продукта из магазина</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Вы уверены, что хотите удалить этот продукт из магазина? Отменить это действие будет невозможно!
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
                mutate(marketProductId);
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
