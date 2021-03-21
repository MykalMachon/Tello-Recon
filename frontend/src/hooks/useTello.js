import { useContext } from 'react';
import { io } from 'socket.io-client';
import { DroneContext } from '../context/DroneContext';

// this makes the initial connection to the drone, and then updates drone state
const connectTello = (socket, dispatch) => {
  socket.on('connect', () => {
    socket.emit('drone-connect');
    socket.on('drone-connected', () => {
      console.log('drone is connected on serverside');
      dispatch({
        type: 'TRY_CONNECTION',
        payload: {
          socket: socket,
          status: 'connected',
        },
      });
    });
  });
};

// this just sends a a command to the drone
// see the tello SDK for more info on specific commands
const commandTello = (socket, cmd) => {
  console.log(cmd);
  socket.emit('passthrough', cmd);
};

// this hook allows the client to see current drone state,
// and send commands to it's reducer using dispatch

// TODO set "BUSY" state until drone sends back an "okay" message
const useTello = () => {
  const { droneState, dispatch } = useContext(DroneContext);

  const sendCommand = (type, cmd) => {
    switch (type) {
      case 'CONNECT':
        const newSocket = io('http://localhost:5000');
        connectTello(newSocket, dispatch);
        return;
      case 'PASSTHROUGH':
        commandTello(droneState.socket, cmd);
        return;
      default:
        throw new Error(`command type ${type} is invalid`);
    }
  };

  return { droneState, sendCommand };
};

export default useTello;
