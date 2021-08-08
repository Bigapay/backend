import { EventEmitter } from 'events';
import { Server, Socket } from 'socket.io';

import logger from '../config/winston.config';

export const eventEmitter = new EventEmitter();

export const socketServer = (app: any) => {
  const io = new Server(app, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {
    eventEmitter.on('payment-creation', (payment) => {
      socket.emit('payment-creation', payment);
      logger.info('💰 SENT REAL-TIME NOTIFICATION FOR PAYMENT CREATION');
    });
  });
};
