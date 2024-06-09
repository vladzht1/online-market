import { OrderStatus } from "../models/order";

const ORDER_STATUS_TEXTS: Record<OrderStatus, string> = {
  [OrderStatus.CREATED]: "Создано",
  [OrderStatus.PACKING]: "Собирается",
  [OrderStatus.IN_DELIVERY]: "В доставке",
  [OrderStatus.DELIVERED]: "Доставлено",
  [OrderStatus.CANCELLED_BY_USER]: "Отменено",
  [OrderStatus.CANCELLED_BY_SELLER]: "Отменено продавцом",
}

export const getOrderStatusText = (status: OrderStatus): string => {
  return ORDER_STATUS_TEXTS[status];
}

export const formatDateTimeString = (date: Date | string): string => {
  const normalizedDate = typeof date === "string" ? new Date(date) : date;

  let hours: string = normalizedDate.getHours().toString();
  hours = hours.length === 1 ? "0" + hours : hours;

  let minutes: string = normalizedDate.getMinutes().toString();
  minutes = minutes.length === 1 ? "0" + minutes : minutes;

  let seconds: string = normalizedDate.getSeconds().toString();
  seconds = seconds.length === 1 ? "0" + seconds : seconds;

  return `${normalizedDate.toDateString()} at ${hours}:${minutes}:${seconds}`;
}
