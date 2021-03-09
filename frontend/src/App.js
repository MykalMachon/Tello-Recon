import './App.css';

import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io('http://localhost:5000');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected!');
      console.log(socket.id);
    });
  }, []);

  const sendHello = () => {
    console.log('socket should be being emitted');
    socket.emit('hello', {
      data: 'world',
    });
  };

  return (
    <div className="App">
      <main className="App-container">
        <h1>Drone Controls</h1>
        <div className="App-buttons">
          <button /*onClick={send("up")}*/>Up</button>
          <button /*onClick={send("left")}*/>Left</button>
          <button /*onClick={send("right")}*/>Right</button>
          <button /*onClick={send("down")}*/>Down</button>
          <button /*onClick={send("takeoff")}*/>Takeoff</button>
          <button /*onClick={send("land")}*/>Land</button>
          <button onClick={sendHello}>Hello!</button>
          <p>Battery: 80</p>
        </div>
      </main>
    </div>
  );
}

export default App;
