import * as dgram from 'dgram';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

// create a UDP server to communicate with the drone
const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const createDroneServer = () => {
  const droneServer = createServer();
  const droneSocket = new Server(droneServer, {
    cors: {
      origin: '*',
    },
  });

  return { drone, droneServer, droneSocket };
};

export const initDroneConnection = (
  socket: Socket,
  broadcastStream: Function
): Promise<Function> => {
  return new Promise((resolve, reject) => {
    try {
      // attempt to connect to the drone and report on basic stats
      sendCommand('command');
      sendCommand('streamon');
      sendCommand('battery?');
      // wait 2 seconds after connection before initializing video
      socket.emit('drone-connected');
      setTimeout(() => {
        resolve(broadcastStream());
      }, 2000);
    } catch (err) {
      return reject(err);
    }
  });
};

export const sendCommand = (cmd: string) => {
  drone.send(cmd, 0, cmd.length, PORT, HOST, (err) => {
    if (err) {
      console.log(`ERROR: could not send command ${cmd}`);
    }
    console.log(`Command "${cmd}" sent to Tello`);
  });
};

export default createDroneServer;
