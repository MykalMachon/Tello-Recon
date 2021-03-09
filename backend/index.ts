import drone, { sendCommand } from './controllers/flightController';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('we have a connection!');
  socket.on('hello', () => console.log('message from client recieved!'));
});

drone.on('message', (msg: string) => {
  console.log(`Tello Says 🤖: ${msg}`);
});

server.listen(5000);
console.log('\n🚀 Socket.io Server is listening on http://locahost:5000 \n');

sendCommand('command');
sendCommand('battery?');
