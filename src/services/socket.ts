import { io } from "socket.io-client";

const createSocketInstance = async () => {
  const token = localStorage.getItem("nsg_token");

  // Crie a instância do socket com a token
  const socket = io("http://localhost:3001", {
    query: {
      token: token,
    },
  });

  return socket;
};

export const getSocket = createSocketInstance;