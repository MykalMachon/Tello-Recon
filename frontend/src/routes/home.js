import ConnectionCard from '../components/connection/ConnectionCard';
import Controller from '../components/controller/Controller';
import LogBook from '../components/Log/LogBook';
import VideoFeed from '../components/video/VideoFeed';

const HomePage = () => {
  return (
    <main className="page page__home">
      <VideoFeed />
      <LogBook />
      <Controller />
      <ConnectionCard />
    </main>
  );
};

export default HomePage;
