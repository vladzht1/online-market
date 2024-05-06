import { Address } from "./address";

export class Market {
  public id!: number;
  public name!: string;
  public description!: string;
  public links!: string[];
}

export type WithAddress = {
  officeAddress: Address;
}
