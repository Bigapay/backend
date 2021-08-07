import express from 'express';

import { indexRouter } from './api';
import logger from './config/winston.config';
import { databaseConnection } from './database';
import morganMiddleware from './config/morgan.config';
import { ResponseHandler } from './helpers/response.helper';

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  await databaseConnection();

  app.use(express.json());
  app.use(morganMiddleware);
  app.use('/api/v1', indexRouter);

  app.use((req, res) => {
    return ResponseHandler.sendErrorResponse(res, {
      message: 'Route not found',
    });
  });

  app.listen(port, () => logger.info(`🚀 Server Listening on Port: ${port}`));
};

startServer();
