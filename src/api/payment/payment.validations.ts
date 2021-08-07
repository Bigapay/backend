import { body, param } from 'express-validator';

import { PaymentService } from './payment.service';

export class PaymentValidation {
  public static paymentCreation = [
    body('amount', 'amount is required and must be a number').isNumeric(),
    body('sourceAccount', 'sourceAccount is required and must be a string')
      .isString()
      .trim()
      .notEmpty(),
    body(
      'destinationAccount',
      'destinationAccount is required and must be a string'
    )
      .isString()
      .trim()
      .notEmpty(),
    body('geoLocation', 'geoLocation is required and must be a string')
      .isString()
      .trim()
      .notEmpty(),
  ];

  public static paymentId = [
    param(
      'paymentId',
      'payment parameter Id is required and must be a number'
    ).isInt(),
    param('paymentId').custom(async (id) => {
      const payment = await PaymentService.findOne({ where: { id } });

      if (!payment) {
        return Promise.reject(
          `Payment of the specified Id - ${id} - does not exist`
        );
      }

      return true;
    }),
  ];
}
