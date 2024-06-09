import { Button, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";

import { getAllMarketProducts } from "../../../api/market-product";
import { AvailableProduct } from "../../../models/product";
import { User } from "../../../models/user";
import { UserSelect } from "../user/user-select";
import { MarketProductSelect } from "./market-product-select";

export type OrderPositionType = {
  id: number;
  product: AvailableProduct | null;
  quantity: number;
};

interface IOrderFormProps {
  children?: ReactNode;
  onChange?: (products: OrderPositionType[], user: User | null) => void;
}

export const OrderForm: FC<IOrderFormProps> = ({ children, onChange }) => {
  const { data, isFetching, isError, error } = useQuery(
    "available-products",
    async () => await getAllMarketProducts(),
    {
      keepPreviousData: true,
    }
  );

  if (data) {
    console.log(data);
  }

  const [formState, setFormState] = useState<OrderPositionType[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    console.log({ formState });
    onChange?.(formState, selectedUser);
  }, [formState, onChange, selectedUser]);

  const addProductRow = () => {
    setFormState([...formState, { id: formState.length, product: null, quantity: 1 }]);
  };

  const setProduct = (product: AvailableProduct, index: number) => {
    if (!isIndexCorrect(index)) {
      return;
    }

    const state = [...formState];
    state[index].product = product;

    setFormState(state);
  };

  const changeQuantity = (index: number, offset: number) => {
    if (!isIndexCorrect(index) || (offset !== 1 && offset !== -1)) {
      return;
    }

    const state = [...formState];
    const item = state[index];

    if ((item.quantity === 1 && offset === -1) || (item.quantity === item.product?.quantity && offset === 1)) {
      return;
    }

    item.quantity += offset;
    setFormState(state);
  };

  const removeRow = (id: number) => {
    const state = formState.filter((row) => row.id !== id);
    setFormState(state);
  };

  const isIndexCorrect = (index: number): boolean => {
    return index >= 0 && index < formState.length;
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Пользователь
          </Text>
          <UserSelect onChange={setSelectedUser} />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Продукты
          </Text>

          {formState.map((orderPosition, index) => (
            <Flex gap="1" mb="1" position="relative" flexGrow="1" key={index}>
              {data?.data && (
                <MarketProductSelect
                  availableProducts={data?.data}
                  onChange={(product) => setProduct(product, index)}
                  maxWidth={250}
                />
              )}

              <IconButton variant="soft" onClick={() => changeQuantity(index, -1)}>
                <FaMinus />
              </IconButton>
              <TextField.Root type="number" value={orderPosition.quantity} style={{ width: "fit-content" }} disabled />
              <IconButton variant="soft" onClick={() => changeQuantity(index, 1)}>
                <FaPlus />
              </IconButton>

              <IconButton variant="soft" color="red" onClick={() => removeRow(orderPosition.id)}>
                <FaTrash />
              </IconButton>
            </Flex>
          ))}

          <Button variant="ghost" onClick={addProductRow}>
            Добавить продукт
          </Button>
        </label>
      </Flex>

      {/* Controls */}
      {children}
    </>
  );
};
