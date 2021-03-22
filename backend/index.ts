import drone, {
  broadcastStream,
  sendCommand,
} from './controllers/flightController';
import * as WebSocket from 'ws';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const server = createServer();

const streamServer = createServer((request, response) => {
  console.log('Stream connection has come through');
  request.on('data', (data) => {
    // @ts-ignore
    wsStreamSever.broadcast(data);
  });
});
const wsStreamSever = new WebSocket.Server({
  server: streamServer,
});
// @ts-ignore
wsStreamSever.broadcast = (data: any) => {
  wsStreamSever.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const droneIo = new Server(server, {
  cors: {
    origin: '*',
  },
});

droneIo.on('connection', (socket: Socket) => {
  console.log('DRONE: we have a connection!');
  socket.on('drone-connect', () => {
    sendCommand('command');
    sendCommand('streamon');
    setTimeout(() => {
      broadcastStream();
    }, 3000);
    socket.emit('drone-connected');
  });
  socket.on('drone-status', () => sendCommand('battery?'));
  socket.on('takeoff', () => sendCommand('takeoff'));
  socket.on('land', () => sendCommand('land'));
  socket.on('passthrough', (cmd) => sendCommand(cmd));
});

drone.on('message', (msg: string) => {
  console.log(`Tello Says 🤖: ${msg}`);
});

server.listen(5000);
console.log('🚀 Socket.io Drone Server is listening on http://locahost:5000 ');
streamServer.listen('5001');
console.log('📺 Socket.io Stream Server is listening on ws://locahost:5001');
