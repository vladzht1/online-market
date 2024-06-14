import { Flex, Text, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";

import { MarketProductRequest } from "../../../api/market-product";
import { getMarketById } from "../../../api/markets";
import { Market } from "../../../models/market";
import { Product } from "../../../models/product";
import { Store } from "../../../models/store";
import { MarketsSelect } from "../market/markets-select";
import { StoresSelect } from "../store/stores-select";
import { PriceForm } from "./price-form";
import { ProductsSelect } from "./products-select";

export type PriceType = {
  value: number;
  currency: string;
};

// export type ProductToMarketFormContentType = {
//   marketId?: number;
//   storeId?: number;
//   productId?: number;
//   quantity?: number;
//   price?: PriceType;
// };

export type ProductToMarketFormContentType = Partial<MarketProductRequest>;

interface IProductToMarketFormProps {
  children?: ReactNode;
  initialData?: ProductToMarketFormContentType;
  onChange?: (updatedProduct: ProductToMarketFormContentType) => void;
}

export const ProductToMarketForm: FC<IProductToMarketFormProps> = ({ children, initialData, onChange }) => {
  const [market, setMarket] = useState<Market | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<PriceType>({
    value: 0,
    currency: "RUB",
  });

  const handleSetQuantity = (value: string) => {
    let valueAsNumber = parseInt(value);

    if (isNaN(valueAsNumber)) {
      setQuantity(0);
      return;
    }

    setQuantity(valueAsNumber);
  };

  useEffect(() => {
    if (initialData?.marketId && !market) {
      getMarketById(initialData.marketId).then((market) => {
        setMarket(market.data);
      });
    }
  }, [initialData?.marketId, market]);

  useEffect(() => {
    onChange?.({
      marketId: market?.id || 0,
      productId: product?.id || 0,
      storeId: store?.id || 0,
      price,
      quantity,
    });
  }, [market, onChange, price, product, quantity, store]);

  return (
    <>
      <Flex direction="column" gap="3">
        {!initialData?.marketId && (
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Магазин
            </Text>
            <MarketsSelect onChange={setMarket} />
          </label>
        )}
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Продукт
          </Text>
          <ProductsSelect onChange={setProduct} />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Склад
          </Text>
          <StoresSelect onChange={setStore} />
        </label>
        <label>
          <PriceForm onChange={setPrice} />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Количество товара
          </Text>
          <TextField.Root
            value={quantity}
            placeholder="Количество"
            onChange={(event) => handleSetQuantity(event.target.value)}
          />
        </label>
      </Flex>

      {/* Controls */}
      {children}
    </>
  );
};
