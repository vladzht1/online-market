import { DataList } from "@radix-ui/themes";
import { FC, useRef } from "react";

import { Address } from "../../../models/address";

const MIN_WIDTH = "88px";

interface IAddressDataListProps {
  address: Address;
  minWidth?: string;
}

export const AddressDataList: FC<IAddressDataListProps> = ({ address, minWidth }) => {
  const itemMinWidth = useRef(minWidth ?? MIN_WIDTH);

  return (
    <DataList.Root>
      <DataList.Item align="center">
        <DataList.Label minWidth={itemMinWidth.current}>Страна</DataList.Label>
        <DataList.Value>{address.countryCode}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Регион</DataList.Label>
        <DataList.Value>{address.region}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Город</DataList.Label>
        <DataList.Value>{address.city}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Улица</DataList.Label>
        <DataList.Value>{address.street}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Строение</DataList.Label>
        <DataList.Value>{address.building}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Квартира</DataList.Label>
        <DataList.Value>{address.apartment}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Почтовый индекс</DataList.Label>
        <DataList.Value>{address.zipCode}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth={itemMinWidth.current}>Комментарий</DataList.Label>
        <DataList.Value>{address.comment}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
};
