import './App.css';

import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:5000');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to drone server');
      socket.emit('drone-connect');
      socket.emit('drone-status');
      socket.on('drone-connected', () => {
        console.log('the drone has connected');
      });
      socket.on('disconnect', () => {
        console.log('disconnected from drone server...');
      });
    });
  }, []);

  const sendTakeoff = () => {
    socket.emit('takeoff');
  };

  const sendLand = () => {
    socket.emit('land');
  };

  return (
    <div className="App">
      <main className="App-container">
        <h1>Drone Controls</h1>
        <div className="App-buttons">
          <button onClick={sendTakeoff}>Takeoff</button>
          <button onClick={sendLand}>Land</button>
          <button /*onClick={send("up")}*/>Up</button>
          <button /*onClick={send("left")}*/>Left</button>
          <button /*onClick={send("right")}*/>Right</button>
          <button /*onClick={send("down")}*/>Down</button>
          {/* <button onClick={sendConnect}>Connect Drone!</button> */}
          <p>Battery: 80</p>
        </div>
      </main>
    </div>
  );
}

export default App;
