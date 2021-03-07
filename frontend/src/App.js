import './App.css';
//import dgram from 'react-native-udp';
//const send = require(''./fly.js')

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body className="App-body">
        <h1>Drone Controls</h1>
        <div className="App-buttons">
          <button /*onClick={send("up")}*/>Up</button>
          <button /*onClick={send("left")}*/>Left</button>
          <button /*onClick={send("right")}*/>Right</button>
          <button /*onClick={send("down")}*/>Down</button>
          <button /*onClick={send("takeoff")}*/>Takeoff</button>
          <button /*onClick={send("land")}*/>Land</button>
          <p>Battery: 80</p>
        </div>
      </body>
    </div>
  );
}

export default App;
