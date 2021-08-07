import { Order, WhereOptions } from 'sequelize';
import { IPayment } from 'database/models/interfaces/IPayment';

import { Payment } from '../../database/models/Payment';

export class PaymentService {
  static async findOne(option: IFindOptions) {
    const payment = await Payment.findOne(option);
    return payment ? (payment.get() as IPayment) : null;
  }

  static async findAll(options?: IFindOptions) {
    const payments = await Payment.findAll(options);
    return payments.map((payment) => payment.get()) as IPayment[];
  }

  static async create(model: IPayment): Promise<IPayment> {
    const payment = await Payment.create(model);
    return payment;
  }
}

export interface IFindOptions {
  where?: WhereOptions;
  order?: Order;
  attributes?: string[];
}
