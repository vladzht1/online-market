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
