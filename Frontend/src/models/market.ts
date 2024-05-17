import { WithAddress } from "../shared/types";

export class Market {
  public id!: number;
  public name!: string;
  public description!: string;
  public links!: string[];
}

export type MarketWithAddress = Market & WithAddress<"officeAddress">;
