import { spawn } from 'child_process';
import * as WebSocket from 'ws';
import { createServer, Server } from 'http';

const createStreamServer = (): Server => {
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
  return streamServer;
};

export default createStreamServer;

// creates a stream broadcast using FFMPEG
export const broadcastStream = () => {
  const ffmpegArgs = [
    '-i',
    'udp://0.0.0.0:11111?overrun_nonfatal=1&fifo_size=50000000',
    '-r',
    '30',
    '-s',
    '720x480',
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

  return () => {
    streamer.kill();
  };
};
