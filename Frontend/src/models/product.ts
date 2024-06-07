import { Market } from "./market";
import { Store } from "./store";

export class Product {
  public id!: number;
  public name!: string;
  public description!: string;
  public images!: ProductImage[];
  public properties!: ProductProperty[];
}

export class ProductImage {
  public id!: number;
  public url!: string;
}

export class ProductProperty {
  public id!: number;
  public name!: string;
  public value!: string;
}

export class AvailableProduct {
  public id!: number;
  public store!: Store;
  public market!: Market;
  public price!: Price;
  public product!: Product;
  public quantity!: number;
}

export class Price {
  public id!: number;
  public product!: Product;
  public market!: Market;
  public value!: number;
  public currency!: string;
  public isValid: boolean = true;
  public createdAt!: Date;
  public invalidatedAt: Date | null = null;
}
