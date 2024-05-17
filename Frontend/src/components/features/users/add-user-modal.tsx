import { Button, Callout, Dialog, Flex } from "@radix-ui/themes";
import { FC, useState } from "react";
import { useMutation } from "react-query";

import { createNewUser } from "../../../api/users";
import { useMessage } from "../../../hooks/use-message";
import { User } from "../../../models/user";
import { IActionModalProps } from "../../../shared/types";
import { validateUserForm } from "../../../validators/user-form-validator";
import { UserForm } from "../../entities/user/user-form";

interface IAddUserModalProps extends IActionModalProps {}

export const AddUserModal: FC<IAddUserModalProps> = ({ children, callback }) => {
  const [formState, setFormState] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const { addMessage, getMessages, hasMessages } = useMessage();
  const { mutate, isSuccess, isError, error, reset } = useMutation(async (user: User) => await createNewUser(user));

  if (isSuccess) {
    callback?.("Пользователь успешно создан!", "SUCCESS", true);
    reset();
  } else if (isError) {
    callback?.((error as any).response?.data?.message ?? (error as any).message, "ERROR", false);

    reset();
  }

  const onDataChanged = (user: User) => {
    setFormState(user);
  };

  const handleSubmit = () => {
    const validationResult = validateUserForm(formState as User);

    Object.values(validationResult.errors).forEach((error) => addMessage(error, "ERROR"));

    if (!validationResult.isValid) {
      return;
    }

    mutate(formState as User);
    setDialogOpen(false);
  };

  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger onClick={() => setDialogOpen(true)}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Добавление пользователя</Dialog.Title>

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

        <UserForm onChange={onDataChanged}>
          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={() => setDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>Создать</Button>
          </Flex>
        </UserForm>
      </Dialog.Content>
    </Dialog.Root>
  );
};
