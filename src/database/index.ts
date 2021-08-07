import { config } from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

import logger from '../config/winston.config';

config();

const modelsPath = `${__dirname}/models`;

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  models: [modelsPath],
});

export const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('⛳️  Database Connected! \n');
  } catch (error) {
    logger.error(`Unable to connect to the database: ${error} \n`);
  }
};
