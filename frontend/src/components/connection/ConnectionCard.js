import useTello from '../../hooks/useTello';
import InputSlider from './InputSlider';

const ConnectionCard = () => {
  const { droneState, sendCommand } = useTello();

  const connectToDrone = () => {
    sendCommand('CONNECT');
  };

  const disconnectDrone = () => {
    sendCommand('DISCONNECT');
  };

  return (
    <section className="card connection">
      <div className="connect_actions">
        <h4>Connection & State</h4>
        <button onClick={connectToDrone} disabled={droneState.socket}>
          Connect
        </button>
        <button onClick={disconnectDrone} disabled={!droneState.socket}>
          Disconnect
        </button>
      </div>
      <div className="drone_state">
        <code>State: {droneState.status}</code> <br />
        <code>Battery: {droneState.battery}%</code> <br />
        <br />
      </div>
      <div className="drone_stats">
        <InputSlider
          id="speed"
          defaultValue={droneState.speed}
          label="Speed"
          min={10}
          max={100}
          units="cm/s"
          cmd="speed"
        />
        <InputSlider
          id="hDist"
          defaultValue={droneState.hDist}
          label="Horizontal Distance"
          min={20}
          max={500}
          units="cm"
        />
        <InputSlider
          id="vDist"
          defaultValue={droneState.vDist}
          label="Vertical Distance"
          min={20}
          max={500}
          units="cm"
        />
        <InputSlider
          id="deg"
          defaultValue={droneState.deg}
          label="Pivot Degrees"
          min={22.5}
          max={360}
          units="deg"
        />
      </div>
    </section>
  );
};

export default ConnectionCard;
