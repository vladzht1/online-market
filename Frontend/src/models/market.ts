import { WithAddress } from "../shared/types";
import { AvailableProduct } from "./product";

export class Market {
  public id!: number;
  public name!: string;
  public description!: string;
  public links!: string;
  public products?: AvailableProduct[]
}

export type MarketWithAddress = Market & WithAddress<"officeAddress">;
