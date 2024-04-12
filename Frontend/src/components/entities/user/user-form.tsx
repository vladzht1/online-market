import { Flex, Text, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";

import { User } from "../../../models/user";

interface IUserFormProps {
  children?: ReactNode;
  initialData?: User;
  onChange?: (updatedUser: User) => void;
}

export const UserForm: FC<IUserFormProps> = ({
  children,
  initialData,
  onChange,
}) => {
  const [formState, setFormState] = useState<User>(
    initialData ?? {
      firstName: "",
      middleName: "",
      lastName: "",
      login: "",
      email: "",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  const setValue = (key: keyof User, value: any) => {
    setFormState({ ...formState, [key]: value });
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Имя
          </Text>
          <TextField.Root
            value={formState.firstName}
            onChange={(event) => setValue("firstName", event.target.value)}
            placeholder="Имя"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Фамилия
          </Text>
          <TextField.Root
            value={formState.lastName}
            onChange={(event) => setValue("lastName", event.target.value)}
            placeholder="Фамилия"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Отчество
          </Text>
          <TextField.Root
            value={formState.middleName}
            onChange={(event) => setValue("middleName", event.target.value)}
            placeholder="Отчество"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Логин
          </Text>
          <TextField.Root
            value={formState.login}
            onChange={(event) => setValue("login", event.target.value)}
            placeholder="Логин"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Почта
          </Text>
          <TextField.Root
            value={formState.email}
            onChange={(event) => setValue("email", event.target.value)}
            placeholder="Почта"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Пароль
          </Text>
          <TextField.Root
            value={formState.password}
            onChange={(event) => setValue("password", event.target.value)}
            placeholder="Пароль"
            type="password"
            autoComplete="new-password"
          />
        </label>
      </Flex>

      {/* Controls */}
      {children}
    </>
  );
};
