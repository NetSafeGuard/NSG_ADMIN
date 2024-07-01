import { createContext, useEffect, useState } from 'react';
import type { Socket } from 'socket.io-client';
import { getSocket } from '@/services/socket';

interface SocketContextType {
    socket: Socket | null;
}

export const SocketContext = createContext({} as SocketContextType);

export const SocketProvider = ({ children }: any) => {
	const [socket, setSocket] = useState({} as Socket | null);

    useEffect(() => {
        const setupSocket = async () => {
            const socket = await getSocket();
            setSocket(socket);
        };

        setupSocket();
    }, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};
