import { Select } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";

import { AvailableProduct } from "../../../models/product";

interface IMarketProductSelectProps {
  availableProducts: AvailableProduct[];
  onChange: (product: AvailableProduct) => void;
  maxWidth?: number;
}

export const MarketProductSelect: FC<IMarketProductSelectProps> = ({ availableProducts, onChange }) => {
  const [activeProduct, setActiveProduct] = useState<AvailableProduct>(availableProducts[0]);

  useEffect(() => {
    onChange(activeProduct);
  }, [activeProduct, onChange]);

  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger />
      <Select.Content variant="soft">
        <Select.Group>
          <Select.Label>Продукты</Select.Label>
          {availableProducts.map((product) => (
            <Select.Item value={product.id + ""} onChange={() => setActiveProduct(product)}>
              {product.product.name} - {product.price.value} {product.price.currency}({product.market.name})
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
