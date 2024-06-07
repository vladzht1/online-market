import { http } from "../app/axios";
import { Product } from "../models/product";

const BASE_URL = "/api/products";

export const getAllProducts = () => {
  return http.get(BASE_URL);
}

export const getProductById = (productId: number) => {
  return http.get(`${BASE_URL}/${productId}`);
}

export const createNewProduct = (productData: Product) => {
  return http.post(BASE_URL, {
    ...productData,
    images: productData.images.map(image => image.url)
  });
}

export const updateProduct = (productData: Partial<Product> & { id: number }) => {
  return http.patch(BASE_URL, {
    ...productData,
    images: productData.images?.map(image => image.url) ?? []
  });
}

export const deleteProductById = (productId: number) => {
  return http.delete(`${BASE_URL}/${productId}`);
}
