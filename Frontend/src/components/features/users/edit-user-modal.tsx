import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { FC, ReactNode } from "react";

import { MessageType } from "../../../shared/types";

interface IEditUserModalProps {
  children: ReactNode;
  userId: number;
  callback?: (message: string, messageType: MessageType) => void;
}

export const EditUserModal: FC<IEditUserModalProps> = ({ children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Редактирование пользователя</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Фамилия
            </Text>
            <TextField.Root defaultValue="" placeholder="Фамилия" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Имя
            </Text>
            <TextField.Root defaultValue="" placeholder="Имя" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Отчество
            </Text>
            <TextField.Root defaultValue="" placeholder="Отчество" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
