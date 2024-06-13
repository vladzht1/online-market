import { FC, useCallback } from "react";
import { useMutation } from "react-query";

import { updateOrder } from "../../../api/orders";
import { OrderStatus } from "../../../models/order";
import { OrderStatusSelect } from "../../entities/order/order-status-select";

interface IChangeOrderStatusProps {
  initialValue: OrderStatus;
  orderId: number;
  onChange?: (status: OrderStatus) => void;
}

export const ChangeOrderStatus: FC<IChangeOrderStatusProps> = ({ initialValue, orderId, onChange }) => {
  const { mutate, reset } = useMutation(
    async ({ orderId, status }: { orderId: number; status: OrderStatus }) => await updateOrder({ id: orderId, status }),
    {
      retry: false,
      onSuccess: (data) => {
        onChange?.(data.data.status);
      },
    }
  );

  const handleChange = useCallback(
    (status: OrderStatus) => {
      mutate({ orderId, status });
      reset();
    },
    [mutate, orderId, reset]
  );

  return <OrderStatusSelect initialValue={initialValue} onChange={handleChange} />;
};
