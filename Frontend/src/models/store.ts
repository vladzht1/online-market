import { WithAddress } from "../shared/types";

export class Store {
  public id!: number;
  public label!: string;
}

export type StoreWithAddress = Store & WithAddress<"address">;
