import { WithAddress } from "../shared/types";

export class Store {
  public id!: number;
  public label!: string;
  public capacity!: number;
  public loaded!: number;
}

export type StoreWithAddress = Store & WithAddress<"address">;
