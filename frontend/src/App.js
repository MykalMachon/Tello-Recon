import './App.css';

import DroneProvider from './context/DroneContext';
import useTello from './hooks/useTello';

// const socket = io('http://localhost:5000');

function App() {
  const { droneState, sendCommand } = useTello();

  return (
    <DroneProvider>
      <div className="App">
        <main className="App-container">
          <h1>Drone Controls</h1>
          <button
            onClick={() => {
              sendCommand('CONNECT');
            }}
          >
            Connect
          </button>
          <button
            onClick={() => {
              sendCommand('PASSTHROUGH', 'takeoff');
            }}
          >
            Takeoff
          </button>
          <button
            onClick={() => {
              sendCommand('PASSTHROUGH', 'land');
            }}
          >
            Land
          </button>
          <code>{JSON.stringify(droneState)}</code>
        </main>
      </div>
    </DroneProvider>
  );
}

export default App;
