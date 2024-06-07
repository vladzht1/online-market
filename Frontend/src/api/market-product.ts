import { http } from "../app/axios";
import { PriceType } from "../components/entities/product/product-to-market-form";
import { AvailableProduct } from "../models/product";

const BASE_URL = "/api/market_products";

export type MarketProductRequest = {
  storeId: number,
  marketId: number,
  productId: number,
  quantity: number,
  price: PriceType
}

export const getAllMarketProducts = () => {
  return http.get(BASE_URL);
}

export const getMarketProductById = (marketProductId: number) => {
  return http.get(`${BASE_URL}/${marketProductId}`);
}

export const createMarketProduct = (marketData: MarketProductRequest) => {
  return http.post(BASE_URL, {
    ...marketData
  });
}

export const updateMarketProduct = (marketData: Partial<AvailableProduct> & { id: number }) => {
  return http.patch(BASE_URL, {
    ...marketData
  });
}

export const deleteMarketProductById = (marketProductId: number) => {
  return http.delete(`${BASE_URL}/${marketProductId}`);
}
