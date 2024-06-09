import { WithAddress } from "../shared/types";

export class User {
  public id!: number;
  public firstName!: string;
  public middleName!: string;
  public lastName!: string;
  public login!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export type UserWithAddress = User & WithAddress<"deliveryAddress">;
