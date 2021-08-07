export interface IPayment {
  id?: number;
  amount: number;
  sourceAccount: string;
  destinationAccount: string;
  geoLocation: string;
  createdAt?: Date;
  updatedAt?: Date;
}
