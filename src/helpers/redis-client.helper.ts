import Redis from 'redis';
import { config } from 'dotenv';

import logger from '../config/winston.config';

class RedisClient {
  private redisClient;

  constructor() {
    config();

    this.redisClient = Redis.createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  cacheNotifiableSytem(systemName: string, socketId: string) {
    return new Promise<number>((resolve, reject) => {
      this.redisClient.HSET(
        'paymentNotifiableSystems',
        systemName,
        socketId,
        (error, data) => {
          if (error) {
            logger.warn(
              'Error occured while attempting to cache notifiable system with Redis'
            );
            reject(error);
          }

          if (data !== null) {
            return resolve(data);
          }
        }
      );
    });
  }

  getNotifiableSystem(systemName: string) {
    return new Promise<string>((resolve, reject) => {
      this.redisClient.HGET(
        'paymentNotifiableSystems',
        systemName,
        (error, data) => {
          if (error) {
            logger.warn(
              'Error occured while attempting to retrieve Redis cached notifiable system'
            );
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  }

  getNotifiableSystems() {
    return new Promise<{ [key: string]: string }>((resolve, reject) => {
      this.redisClient.HGETALL('paymentNotifiableSystems', (error, data) => {
        if (error) {
          logger.warn(
            'Error occured while attempting to retrieve Redis cached notifiable systems'
          );
          return reject(error);
        }

        return resolve(data);
      });
    });
  }

  deleteNotifiableSystem(systemName: string) {
    return new Promise<number>((resolve, reject) => {
      this.redisClient.HDEL(
        'paymentNotifiableSystems',
        systemName,
        (error, data) => {
          if (error) {
            logger.error(
              'Error occured while attempting to delete Redis cached notifiable system'
            );
            return reject(error);
          }

          return resolve(data);
        }
      );
    });
  }
}

export default new RedisClient();
