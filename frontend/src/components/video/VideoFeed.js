import { useEffect, useRef, useState } from 'react';
import useTello from '../../hooks/useTello';

const VideoFeed = () => {
  const streamRef = useRef(null);
  const [streamHandler, setStreamHandler] = useState(null);
  const { droneState } = useTello();

  useEffect(() => {
    if (droneState.socket && !streamHandler) {
      setTimeout(() => {
        const url = `ws://localhost:5001/stream`;
        setStreamHandler(
          new window.JSMpeg.Player(url, { canvas: streamRef.current })
        );
      }, 4000);
    }
  }, [droneState.socket, streamHandler]);

  return (
    <section className="videoFeed">
      <canvas
        width="720"
        height="480"
        id="tello-stream"
        ref={streamRef}
      ></canvas>
    </section>
  );
};

export default VideoFeed;
