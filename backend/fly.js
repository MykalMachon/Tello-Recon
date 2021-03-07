const dgram = require('dgram');

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

function sendCommand(cmd){
    drone.send(cmd, 0, cmd.length, PORT, HOST, (err, bytes) => {
        if(err) throw err;
        console.log(`Command ${cmd} sent to ${HOST}: ${PORT}`);
    })
}

drone.on('message', msg  => {
    console.log(`${HOST}:${PORT}: ${msg}`);
});

sendCommand('command');
sendCommand('battery?');

//export default sendCommand;