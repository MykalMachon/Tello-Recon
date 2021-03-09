import drone, { sendCommand } from './controllers/flightController';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const server = createServer();
const io = new Server(server, {});

io.on('connection', (socket: Socket) => {
  console.log('we have a connection!');
});

drone.on('message', (msg: string) => {
  console.log(`Tello Says 🤖: ${msg}`);
});

server.listen(8080);
console.log('\n🚀 Socket.io Server is listening on http://locahost:8080 \n');

sendCommand('command');
sendCommand('battery?');
