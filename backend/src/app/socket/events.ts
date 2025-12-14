import { Socket } from "socket.io";

export const registerSocketEvents = (socket: Socket) => {
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("send-message", (data) => {
    socket.to(data.roomId).emit("receive-message", data);
  });
};
