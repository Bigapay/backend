import { Router } from 'express';

import { paymentRouter } from './payment';

export const indexRouter = Router();

indexRouter.use('/payment', paymentRouter);
