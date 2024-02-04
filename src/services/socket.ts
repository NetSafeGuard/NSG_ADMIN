import { io } from "socket.io-client";

const createSocketInstance = async () => {
  const token = localStorage.getItem("nsg_token");

  const socket = io("https://wss.netsafeguard.cloud", {
    query: {
      token: token,
    },
  });

  return socket;
};

export const getSocket = createSocketInstance;
