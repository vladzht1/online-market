import { http } from "../app/axios";
import { OrderPositionType } from "../components/entities/order/order-form";
import { Order } from "../models/order";

const BASE_URL = "/api/orders";

export const getAllOrders = () => {
  return http.get(BASE_URL);
}

export const getAllOrderStatuses = () => {
  return http.get(`${BASE_URL}/statuses`);
}

export const getOrderById = (orderId: number) => {
  return http.get(`${BASE_URL}/${orderId}`);
}

export const createNewOrder = (orderData: OrderPositionType[], userId: number) => {
  return http.post(BASE_URL, {
    products: orderData.map(product => ({ marketProductId: product.product?.id, quantity: product.quantity })),
    userId
  });
}

export const updateOrder = (orderData: Partial<Order> & { id: number }) => {
  console.log(orderData);
  return http.patch(BASE_URL, {
    ...orderData,
  });
}

export const deleteOrderById = (orderId: number) => {
  return http.delete(`${BASE_URL}/${orderId}`);
}
