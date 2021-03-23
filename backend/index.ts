import createDroneServer, {
  initDroneConnection,
  sendCommand,
} from './controllers/droneController';
import createStreamServer, {
  broadcastStream,
} from './controllers/streamController';
import { Socket } from 'socket.io';

// create a drone HTTP server, socket handler, and drone UDP client
const { drone, droneServer, droneSocket } = createDroneServer();
// create and initialize the stream server for drone video
const streamServer = createStreamServer();
// placeholder for killing the ffmpeg broadcast
let killBroadcast: Function = () => {};

droneSocket.on('connection', (socket: Socket) => {
  console.log('DRONE: we have a connection!');
  // listen for a connection from the client
  socket.on('drone-connect', async () => {
    // init drone stuff, and return a callback to kill the stream later
    killBroadcast = await initDroneConnection(socket, broadcastStream);
    // setup handler for incoming drone messages
    drone.on('message', (msg: string) => {
      socket.emit('drone-response', `${msg}`);
    });
  });
  socket.on('drone-disconnect', () => {
    sendCommand('streamoff');
    killBroadcast();
  });
  socket.on('passthrough', (cmd) => sendCommand(cmd));
});

droneServer.listen(5000);
console.log('🚀 Socket.io Drone Server is listening on http://locahost:5000 ');
streamServer.listen('5001');
console.log('📺 Socket.io Stream Server is listening on ws://locahost:5001');
