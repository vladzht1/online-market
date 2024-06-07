import { http } from "../app/axios";
import { Address } from "../models/address";
import { Market, MarketWithAddress } from "../models/market";

const BASE_URL = "/api/markets";

export const getAllMarkets = () => {
  return http.get(BASE_URL);
}

export const getMarketById = (marketId: number) => {
  return http.get(`${BASE_URL}/${marketId}`);
}

export const createNewMarket = (marketData: Market, addressData: Address) => {
  return http.post(BASE_URL, {
    ...marketData,
    address: addressData
  });
}

export const updateMarket = (marketData: Partial<MarketWithAddress> & { id: number }) => {
  return http.patch(BASE_URL, {
    ...marketData,
    address: marketData.officeAddress
  });
}

export const deleteMarketById = (marketId: number) => {
  return http.delete(`${BASE_URL}/${marketId}`);
}
