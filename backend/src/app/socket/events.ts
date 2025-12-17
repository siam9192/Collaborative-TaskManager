import { Socket } from 'socket.io';
import { AuthUser } from '../types';
import { getUserSocketIds, removeUserSocket } from './socketStore';
import userRepository from '../modules/user/user.repository';

export const registerSocketEvents = (socket: Socket) => {
  const authUser = socket.data.user as AuthUser;

  // Handle disconnect
  socket.on('disconnect', async (reason) => {
    console.log(`🔴 Socket disconnected: ${socket.id}, reason: ${reason}`);
    if (authUser) {
      removeUserSocket(authUser.id, socket.id);
      const socketIds = getUserSocketIds(authUser.id);
      if (socketIds.length === 0) {
        userRepository.updateById(authUser.id, { isActive: false });
      }
    }
  });
};
