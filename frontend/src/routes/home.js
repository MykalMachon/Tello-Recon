import { Link } from 'react-router-dom';
import Controller from '../components/controller/Controller';
import VideoFeed from '../components/video/VideoFeed';
import useTello from '../hooks/useTello';

const HomePage = () => {
  const { droneState, sendCommand } = useTello();

  return (
    <main className="page page__home">
      <div className="card" style={{ gridRow: '1 / 6', gridColumn: '1 / 2' }}>
        <h1>Tello Recon</h1>
        <Link to="/settings">settings</Link>
      </div>
      <VideoFeed />
      <Controller />
      <div className="card">
        Special Commands
        <button
          onClick={() => {
            sendCommand('CONNECT');
          }}
        >
          Attempt Connection
        </button>
      </div>
      <div className="card">
        Connection & Stats <br />
        <code>dronestate: {droneState.status}</code>
      </div>
    </main>
  );

  // return (
  //   <div className="App">
  //     <main className="App-container">
  //       <h1>Drone Controls</h1>
  //       <button
  //         onClick={() => {
  //           sendCommand('CONNECT');
  //         }}
  //       >
  //         Connect
  //       </button>
  //       <button
  //         onClick={() => {
  //           sendCommand('PASSTHROUGH', 'takeoff');
  //         }}
  //       >
  //         Takeoff
  //       </button>
  //       <button
  //         onClick={() => {
  //           sendCommand('PASSTHROUGH', 'land');
  //         }}
  //       >
  //         Land
  //       </button>
  //       <code>{JSON.stringify(droneState)}</code>
  //     </main>
  //   </div>
  // );
};

export default HomePage;
