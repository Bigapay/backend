import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

import { ResponseHandler } from '../../helpers/response.helper';
import { STATUS_CODES } from '../../constants/status-code.contants';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors: any = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));

    const message = 'Oooops, Something went wrong, check the reason below';
    return ResponseHandler.sendResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      false,
      message,
      {
        errors: extractedErrors,
      }
    );
  };
};
