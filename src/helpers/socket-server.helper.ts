import { EventEmitter } from 'events';
import { Server, Socket } from 'socket.io';
import redisClient from './redis-client.helper';

import { findKeyByValue, findValuesByKeys } from '../utils';
import logger from '../config/winston.config';

export const eventEmitter = new EventEmitter();

export const socketServer = (app: any) => {
  const io = new Server(app, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', async (socket: Socket) => {
    socket.on('legible-notifiable-system', async (systemName) => {
      const legibleSystemSocketId = await redisClient.getNotifiableSystem(
        systemName
      );

      if (legibleSystemSocketId) {
        await redisClient.cacheNotifiableSytem(systemName, socket.id);

        logger.info(
          `LEGIBLE SYSTEM SOCKET ID FOR ${systemName} UPDATED TO: ${socket.id}`
        );
      }

      if (!legibleSystemSocketId) {
        await redisClient.cacheNotifiableSytem(systemName, socket.id);
        logger.info(
          `LEGIBLE SYSTEM - ${systemName} - REGISTERED FOR THE FIRST TIME WITH SOCKET ID: ${socket.id}}`
        );
      }
    });

    socket.on('disconnect', async () => {
      const legibleSystems = await redisClient.getNotifiableSystems();
      const systemName = findKeyByValue(legibleSystems, socket.id);

      if (systemName) {
        await redisClient.deleteNotifiableSystem(systemName);
        logger.info(
          `LEGIBLE SYSTEM REMOVED FROM THE CACHE PRIOR TO ITS DISCONNECTION: ${systemName}`
        );
      }

      logger.info(`LEGIBLE SYSTEM DISCONNECTED: ${socket.id}`);
    });
  });

  eventEmitter.on('payment-creation', async (payment) => {
    const legibleSystems = await redisClient.getNotifiableSystems();

    if (legibleSystems) {
      const systemSocketIds = findValuesByKeys(legibleSystems);

      for (const legibleSystemSocketId of systemSocketIds) {
        io.to(legibleSystemSocketId).emit('payment-creation', payment);
      }

      logger.info(
        '💰 SENT REAL-TIME NOTIFICATION TO LEGIBLE SYSTEMS FOR PAYMENT CREATION'
      );
    }
  });
};
