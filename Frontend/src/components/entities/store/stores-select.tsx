import { Select } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getAllStores } from "../../../api/stores";
import { Store } from "../../../models/store";

interface IStoresSelectProps {
  onChange?: (store: Store | null) => void;
  disabled?: boolean;
}

export const StoresSelect: FC<IStoresSelectProps> = ({ onChange, disabled = false }) => {
  const { data } = useQuery("stores", async () => await getAllStores(), {
    keepPreviousData: true,
  });

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleSelected = (selectedStoreId: string) => {
    for (const store of data?.data) {
      if (String(store.id) === selectedStoreId) {
        setSelectedStore(store);
        return;
      }
    }

    setSelectedStore(null);
  };

  useEffect(() => {
    onChange?.(selectedStore);
  }, [onChange, selectedStore]);

  return (
    <Select.Root onValueChange={handleSelected} disabled={disabled}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Выберите склад</Select.Label>
          {data &&
            data.data.map((store: Store) => (
              <Select.Item key={store.id} value={String(store.id)}>
                {store.label}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
