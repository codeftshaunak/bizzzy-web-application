import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { socketURL } from '../helpers/proxy';
import { getAllDetailsOfUser } from '../helpers/userApis';

const SocketContext = createContext();

// Function to create and configure a socket
const createSocket = (userId) => {
    const newSocket = io(socketURL, {
        autoConnect: true,
    });

    newSocket.on('connect', () => {
        console.log('Socket connected');
        newSocket.emit('connect_user', { user_id: userId });
    });

    return newSocket;
};

const resp = await getAllDetailsOfUser();
const userId = resp?.user_id;

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (userId) {
            const newSocket = createSocket(userId);
            setSocket(newSocket);

            // Cleanup function
            return () => {
                console.log('Socket disconnected');
                newSocket.disconnect();
            };
        }
    }, [userId]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the socket
const useSocket = () => {
    const { socket } = useContext(SocketContext);
    if (!socket) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return socket;
};

export { SocketProvider, useSocket, SocketContext, userId };
