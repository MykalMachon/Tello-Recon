import { useEffect, useRef } from 'react';
import useTello from '../../hooks/useTello';

const VideoFeed = () => {
  const streamRef = useRef(null);
  const { droneState } = useTello();

  useEffect(() => {
    if (droneState.socket) {
      console.log('stream timer started');
      setTimeout(() => {
        console.log('stream should have started');
        const url = `ws://localhost:5001/stream`;
        new window.JSMpeg.Player(url, { canvas: streamRef.current });
      }, 4000);
    }
  }, [droneState.socket]);

  return (
    <section className="videoFeed">
      <canvas
        width="500"
        height="500"
        id="tello-stream"
        ref={streamRef}
      ></canvas>
    </section>
  );
};

export default VideoFeed;
