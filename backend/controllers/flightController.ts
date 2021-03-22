import * as dgram from 'dgram';
import { spawn } from 'child_process';

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

export const broadcastStream = () => {
  const ffmpegArgs = [
    '-i',
    'udp://0.0.0.0:11111?overrun_nonfatal=1&fifo_size=50000000',
    '-r',
    '30',
    '-s',
    '960x720',
    '-codec:v',
    'mpeg1video',
    '-b',
    '800k',
    '-f',
    'mpegts',
    'http://127.0.0.1:5001/stream',
  ];

  // TODO find a way to kill this process on exit
  const streamer = spawn('ffmpeg', ffmpegArgs);

  // streamer.stderr.pipe(process.stderr);
  streamer.on('exit', (code) => {
    console.log('ERROR', code);
  });
};
