import { http } from "../app/axios";
import { Address } from "../models/address";
import { Store, StoreWithAddress } from "../models/store";

const BASE_URL = "/api/stores";

export const getAllStores = () => {
  return http.get(BASE_URL);
}

export const getStoreById = (storeId: number): Promise<Store | null> => {
  return http.get(`${BASE_URL}/${storeId}`);
}

export const createNewStore = (storeData: Store, addressData: Address) => {
  return http.post(BASE_URL, {
    ...storeData,
    address: addressData
  });
}

export const updateStore = (storeData: Partial<StoreWithAddress> & { id: number }) => {
  return http.patch(BASE_URL, {
    ...storeData,
    address: storeData.address
  });
}

export const deleteStoreById = (storeId: number) => {
  return http.delete(`${BASE_URL}/${storeId}`);
}
