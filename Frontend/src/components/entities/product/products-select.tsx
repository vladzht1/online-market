import { Select } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getAllProducts } from "../../../api/products";
import { Product } from "../../../models/product";

interface IProductsSelectProps {
  onChange?: (market: Product | null) => void;
  disabled?: boolean;
}

export const ProductsSelect: FC<IProductsSelectProps> = ({ onChange, disabled = false }) => {
  const { data } = useQuery("products", async () => await getAllProducts(), {
    keepPreviousData: true,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelected = (selectedProductId: string) => {
    for (const product of data?.data) {
      if (String(product.id) === selectedProductId) {
        setSelectedProduct(product);
        return;
      }
    }

    setSelectedProduct(null);
  };

  useEffect(() => {
    onChange?.(selectedProduct);
  }, [onChange, selectedProduct]);

  return (
    <Select.Root onValueChange={handleSelected} disabled={disabled}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Выберите продукт</Select.Label>
          {data &&
            data.data.map((product: Product) => (
              <Select.Item key={product.id} value={String(product.id)}>
                {product.name}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
