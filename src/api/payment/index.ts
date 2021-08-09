import { Router } from 'express';

import { validate } from './validation.middleware';
import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validations';

export const paymentRouter = Router();

paymentRouter.get('/', PaymentController.retrievePayments);

paymentRouter.get(
  '/:paymentId',
  validate(PaymentValidation.paymentId),
  PaymentController.retrievePayment
);

paymentRouter.post(
  '/',
  validate(PaymentValidation.paymentCreation),
  PaymentController.createPayment
);
