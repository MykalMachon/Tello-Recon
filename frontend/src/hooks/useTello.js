import { useContext } from 'react';
import { io } from 'socket.io-client';
import { DroneContext } from '../context/DroneContext';

// this makes the initial connection to the drone, and then updates drone state
const connectTello = (dispatch) => {
  const socket = io('http://localhost:5000');
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
    socket.on('drone-response', (msg) => {
      const newLog = {
        timestamp: new Date().toISOString(),
        type: 'response',
        contents: `Tello Says 🤖: ${msg}`,
      };
      if (msg === 'ok') {
        dispatch({
          type: 'STATUS_CHANGE',
          payload: {
            status: 'idle',
          },
          log: newLog,
        });
      }
      if (msg === 'error') {
        dispatch({
          type: 'STATUS_CHANGE',
          payload: {
            status: 'idle',
          },
          log: newLog,
        });
      } else if (parseInt(msg)) {
        console.log(`battery response ${msg}`);
        dispatch({
          type: 'STATUS_CHANGE',
          payload: {
            battery: parseInt(msg),
          },
        });
      }
    });
  });
};

// this disconnects tello from everything else
const disconnectTello = (droneState, dispatch) => {
  droneState.socket.emit('drone-disconnect');
  dispatch({
    type: 'TRY_DISCONNECT',
  });
};

// this just sends a a command to the drone
// see the tello SDK for more info on specific commands
const commandTello = (socket, cmd) => {
  socket.emit('passthrough', cmd);
  socket.emit('passthrough', 'battery?');
};

// this hook allows the client to see current drone state,
// and send commands to it's reducer using dispatch

// TODO set "BUSY" state until drone sends back an "okay" message
const useTello = () => {
  const { droneState, dispatch } = useContext(DroneContext);

  const sendCommand = (type, cmd, setting, value) => {
    switch (type) {
      case 'CONNECT':
        connectTello(dispatch);
        return;
      case 'DISCONNECT':
        disconnectTello(droneState, dispatch);
        return;
      case 'PASSTHROUGH':
        const newLog = {
          timestamp: new Date().toISOString(),
          type: 'command',
          contents: `command sent ${cmd}`,
        };
        dispatch({
          type: 'STATUS_CHANGE',
          payload: {
            status: 'busy',
          },
          log: newLog,
        });
        commandTello(droneState.socket, cmd);
        return;
      case 'UPDATE_SETTINGS':
        if (droneState.socket) {
          dispatch({
            type: 'STATUS_CHANGE',
            payload: {
              [setting]: value,
            },
          });
          if (cmd && !cmd.includes('undefined')) {
            commandTello(droneState.socket, cmd);
          }
        }
        return;
      default:
        throw new Error(`command type ${type} is invalid`);
    }
  };

  return { droneState, sendCommand };
};

export default useTello;
