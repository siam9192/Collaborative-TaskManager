import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { setIO } from './socketStore';
import { registerSocketEvents } from './events';

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  setIO(io);

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    registerSocketEvents(socket);

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected:', socket.id);
    });
  });

  return io;
};
