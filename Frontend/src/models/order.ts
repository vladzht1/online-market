import { Address } from "./address";
import { Market } from "./market";
import { Price, Product } from "./product";
import { Store } from "./store";
import { User } from "./user";

export class Order {
  public id!: number;
  public productPositions!: OrderPosition[];
  public store!: Store;
  public market!: Market;
  public addressForDelivery!: Address;
  public user!: User;
  public status!: OrderStatus;
  public lastStatusUpdated!: Date;
  public deliveredAt!: Date | null;
}

export class OrderStatus {
  public id!: number;
  public label!: string;
  public labelRus!: string;
  public key!: OrderStatusKey;
}

export enum OrderStatusKey {
  CREATED,
  PACKING,
  IN_DELIVERY,
  DELIVERED,
  CANCELLED_BY_USER,
  CANCELLED_BY_SELLER
}

export class OrderPosition {
  public id!: number;
  public product!: Product;
  public order!: Order;
  public price!: Price;
  public quantity!: number;
}
