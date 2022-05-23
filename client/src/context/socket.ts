import { createContext } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config";

export const socket = io(SOCKET_URL);
export const SocketContext = createContext<any>(null);

// TODO: send user token during socket connection
// const getSocket = () => {
//   const token = getAuthToken(); // get jwt token from local storage or cookie
//   if (token) {
//     return io(SOCKET_URL, {
//       query: { token },
//     });
//   }
//   return io(SOCKET_URL);
// };
// export const socket = getSocket();
