import express from "express";

import logger from "./config/winston.config";
import morganMiddleware from "./config/morgan.config";

const startServer = () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(morganMiddleware);

  app.listen(port, () => logger.info(`🚀 Server Listening on Port: ${port}`));
};

startServer();
