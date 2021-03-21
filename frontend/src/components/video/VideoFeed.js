const VideoFeed = () => {
  return (
    <section className="videoFeed">
      <video controls>
        <source
          src="https://dl8.webmfiles.org/big-buck-bunny_trailer.webm"
          type="video/webm"
        />
      </video>
    </section>
  );
};

export default VideoFeed;
