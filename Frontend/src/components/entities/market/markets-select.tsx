import { Select } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getAllMarkets } from "../../../api/markets";
import { Market } from "../../../models/market";

interface IMarketsSelectProps {
  onChange?: (market: Market | null) => void;
  disabled?: boolean;
  initialMarketId?: number;
}

export const MarketsSelect: FC<IMarketsSelectProps> = ({ initialMarketId, onChange, disabled = false }) => {
  const { data } = useQuery("markets", async () => await getAllMarkets(), {
    keepPreviousData: true,
  });

  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const handleSelected = (selectedMarketId: string) => {
    for (const market of data?.data) {
      if (String(market.id) === selectedMarketId) {
        setSelectedMarket(market);
        return;
      }
    }

    setSelectedMarket(null);
  };

  useEffect(() => {
    if (initialMarketId && !selectedMarket) {
      for (const market of data?.data) {
        if (market.id === initialMarketId) {
          setSelectedMarket(market);
        }
      }
    }

    onChange?.(selectedMarket);
  }, [data?.data, initialMarketId, onChange, selectedMarket]);

  return (
    <Select.Root onValueChange={handleSelected} disabled={disabled || !!initialMarketId}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Выберите магазин</Select.Label>
          {data &&
            data.data.map((market: Market) => (
              <Select.Item key={market.id} value={String(market.id)}>
                {market.name}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
