import { Response } from 'express';

import { STATUS_CODES } from '../constants/status-code.contants';

export class ResponseHandler {
  static sendResponse(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: object
  ) {
    const code = statusCode || STATUS_CODES.OK;
    return res.status(code).json({
      success,
      message,
      data,
    });
  }

  static sendErrorResponse(res: Response, errorInstance: IError) {
    const { message, error, statusCode } = errorInstance;
    const code = statusCode || STATUS_CODES.SERVER_ERROR;
    return res.status(code).json({
      success: false,
      message,
      error,
    });
  }
}

export interface IError {
  message?: string;
  statusCode?: number;
  error?: Error;
}
