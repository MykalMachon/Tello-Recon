import * as dgram from 'dgram';

const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4');
drone.bind(PORT);
export default drone;

export const sendCommand = (cmd: string) => {
  drone.send(cmd, 0, cmd.length, PORT, HOST, (err, bytes) => {
    if (err) {
      console.log(`ERROR: could not send command ${cmd}`);
    }
    console.log(`Command "${cmd}" sent to Tello`);
  });
};
