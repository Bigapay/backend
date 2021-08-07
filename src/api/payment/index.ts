import { Router } from 'express';

import { PaymentController } from './payment.controller';
import { PaymentValidation } from './payment.validations';
import { validate } from './validation.middleware';

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
