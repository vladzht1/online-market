import { Select } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getAllUsers } from "../../../api/users";
import { User } from "../../../models/user";

interface IUserSelectProps {
  onChange?: (user: User) => void;
}

export const UserSelect: FC<IUserSelectProps> = ({ onChange }) => {
  const { data } = useQuery("users", async () => await getAllUsers(), {
    keepPreviousData: true,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelected = (selectedUserId: string) => {
    for (const user of data?.data) {
      if (String(user.id) === selectedUserId) {
        setSelectedUser(user);
        return;
      }
    }

    setSelectedUser(null);
  };

  useEffect(() => {
    onChange?.(selectedUser!);
  }, [onChange, selectedUser]);

  return (
    <Select.Root onValueChange={handleSelected}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Выберите пользователя</Select.Label>
          {data &&
            data.data.map((user: User) => (
              <Select.Item key={user.id} value={String(user.id)}>
                {user.firstName} {user.middleName} {user.lastName}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
