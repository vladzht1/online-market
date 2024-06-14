import { http } from "../app/axios";

const BASE_URL = "/api/queries";

export const executeQuery1 = async (minimalNameLength: number) => {
  return await http.get(`${BASE_URL}/one/${minimalNameLength}`);
}

export const executeQuery2 = async (marketName: string) => {
  return await http.get(`${BASE_URL}/two/${marketName}`);
}

export const executeQuery3 = async (marketName: string) => {
  return await http.get(`${BASE_URL}/three/${marketName}`);
}

export const executeQuery4 = async (marketName: string) => {
  return await http.get(`${BASE_URL}/four/${marketName}`);
}

export const executeQuery5 = async (storeName: string) => {
  return await http.get(`${BASE_URL}/five/${storeName}`);
}
