import { useContext, useState } from 'react';
import { io } from 'socket.io-client';
import { DroneContext } from '../context/DroneContext';

const connectTello = (socket) => {
  socket.on('connect', () => {
    socket.emit('drone-connect');
    socket.on('drone-connected', () => {});
  });
};

const commandTello = (socket, cmd) => {
  socket.emit('passthrough', cmd);
};

const useTello = () => {
  const { droneState, setDroneState } = useContext(DroneContext);
  const [socket, setSocket] = useState(null);

  const sendCommand = (type, cmd) => {
    switch (type) {
      case 'CONNECT':
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        connectTello(newSocket);
        setDroneState({
          ...droneState,
          socket: socket,
          status: 'connected',
        });
        return;
      case 'PASSTHROUGH':
        commandTello(socket, cmd);
        return;
      default:
        throw new Error(`command type ${type} is invalid`);
    }
  };

  return { droneState, sendCommand };
};

export default useTello;
