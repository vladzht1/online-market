import { http } from "../app/axios";
import { Address } from "../models/address";
import { Market, WithAddress } from "../models/market";

export const getAllMarkets = () => {
  return http.get("/api/markets");
}

export const getMarketById = (marketId: number): Promise<(Market & WithAddress) | null> => {
  return http.get(`/api/markets/${marketId}`);
}

export const createNewMarket = (marketData: Market, addressData: Address) => {
  return http.post("/api/markets", {
    ...marketData,
    address: addressData
  });
}

export const updateMarket = (marketData: Partial<Market & WithAddress> & { id: number }) => {
  return http.patch("/api/markets", {
    ...marketData,
    address: marketData.officeAddress
  });
}

export const deleteMarketById = (marketId: number) => {
  return http.delete(`/api/markets/${marketId}`);
}
