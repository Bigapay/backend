import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

import { IPayment } from './interfaces/IPayment';

@Table
export class Payment extends Model implements IPayment {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  amount: number;

  @Column
  sourceAccount: string;

  @Column
  destinationAccount: string;

  @Column
  geoLocation: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
