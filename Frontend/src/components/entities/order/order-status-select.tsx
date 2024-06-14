import { Select, Text } from "@radix-ui/themes";
import { FC, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import { getAllOrderStatuses } from "../../../api/orders";
import { OrderStatus, OrderStatusKey } from "../../../models/order";

interface IOrderStatusSelectProps {
  initialValue: OrderStatus;
  onChange?: (status: OrderStatus) => void;
}

export const OrderStatusSelect: FC<IOrderStatusSelectProps> = ({ initialValue, onChange }) => {
  const initialized = useRef(false);

  const { data: statuses } = useQuery("all-statuses", async () => getAllOrderStatuses(), {
    onSuccess: () => {
      initialized.current = true;
    },
  });

  const [activeStatus, setActiveStatus] = useState<OrderStatus | null>(initialValue);

  const handleStatusChange = (statusNumber: string) => {
    if (activeStatus?.key === parseInt(statusNumber)) {
      return;
    }

    for (const status of statuses?.data) {
      if (status.key === parseInt(statusNumber)) {
        setActiveStatus(status);
      }
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      return;
    }

    if (initialized.current && activeStatus) {
      onChange?.(activeStatus);
    }
  }, [activeStatus, onChange]);

  return (
    <>
      {statuses?.data && (
        <>
          {initialValue.key === OrderStatusKey.DELIVERED ? (
            <Text>{initialValue.labelRus}</Text>
          ) : (
            <Select.Root defaultValue={activeStatus?.key + ""} onValueChange={(value) => handleStatusChange(value)}>
              <Select.Trigger variant="surface" color="gray" />
              <Select.Content>
                {statuses?.data.map((status: OrderStatus) => (
                  <Select.Item value={status.key + ""} key={status.id}>
                    {status.labelRus}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        </>
      )}
    </>
  );
};
