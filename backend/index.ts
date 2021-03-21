import drone, { sendCommand } from './controllers/flightController';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { send } from 'node:process';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('we have a connection!');
  socket.on('hello', () => console.log('message from client recieved!'));
  socket.on('drone-connect', () => {
    sendCommand('command');
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
console.log('\n🚀 Socket.io Server is listening on http://locahost:5000 \n');
