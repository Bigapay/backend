import { Router } from 'express';

import { PaymentController } from './payment.controller';

export const paymentRouter = Router();

paymentRouter.post('/', PaymentController.createPayment);
