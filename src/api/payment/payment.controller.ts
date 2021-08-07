import { Request, Response } from 'express';

import logger from '../../config/winston.config';
import { PaymentService } from './payment.service';
import { IPayment } from 'database/models/interfaces/IPayment';
import { ResponseHandler } from '../../helpers/response.helper';
import { STATUS_CODES } from '../../constants/status-code.contants';

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const location = req.body.geoLocation.toLowerCase();
      const payment = await PaymentService.create({
        ...req.body,
        geoLocation: location,
      });

      return ResponseHandler.sendResponse(
        res,
        STATUS_CODES.OK,
        true,
        'Payment recorded',
        payment
      );
    } catch (error) {
      const message = 'Something went wrong while processing the payment';

      logger.error(`${message}: ${error.message}`);

      return ResponseHandler.sendErrorResponse(res, {
        message,
        error: error.message,
      });
    }
  }

  static async retrievePayments(req: Request, res: Response) {
    try {
      const location = req.query.location?.toString().toLowerCase();
      let payments: IPayment[];

      if (location) {
        payments = await PaymentService.findAll({
          where: { geoLocation: location },
        });

        return ResponseHandler.sendResponse(
          res,
          STATUS_CODES.OK,
          true,
          `Payments for ${location} retrieved`,
          payments
        );
      }

      payments = await PaymentService.findAll();

      return ResponseHandler.sendResponse(
        res,
        STATUS_CODES.OK,
        true,
        'Payments retrieved',
        payments
      );
    } catch (error) {
      const message =
        'Something went wrong while attempting to retrieve the payments';

      logger.error(`${message}: ${error.message}`);

      return ResponseHandler.sendErrorResponse(res, {
        message,
        error: error.message,
      });
    }
  }

  static async retrievePayment(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;

      const payment = await PaymentService.findOne({
        where: { id: paymentId },
      });

      return ResponseHandler.sendResponse(
        res,
        STATUS_CODES.OK,
        true,
        'Payment retrieved',
        payment
      );
    } catch (error) {
      const message =
        'Something went wrong while attempting to retrieve the payment';

      logger.error(`${message}: ${error.message}`);

      return ResponseHandler.sendErrorResponse(res, {
        message,
        error: error.message,
      });
    }
  }
}
