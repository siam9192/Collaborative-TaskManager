import { io, Socket } from "socket.io-client";
import envConfig from "../utils/envConfig";

const SOCKET_URL = envConfig.backendSocketBaseUrl as string ;

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false, // important for auth-based apps
  withCredentials: true,
});
