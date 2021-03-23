import { useEffect, useState } from 'react';
import useTello from '../../hooks/useTello';
import ControllerButton from './ControllerButton';

const Controller = () => {
  const { droneState, sendCommand } = useTello();

  // list of all actions the controller can issue to the drone
  // is used to create and map buttons
  // TODO add pivot commands
  // TODO add up / down commands
  const actions = [
    { label: 'Pivot Left', key: 'q', cmd: `ccw ${droneState.deg}` },
    { label: 'Forward', key: 'w', cmd: `forward ${droneState.hDist}` },
    { label: 'Pivot Right', key: 'e', cmd: `cw ${droneState.deg}` },
    { label: 'Ascend', key: 'r', cmd: `up ${droneState.vDist}` },
    { label: 'Takeoff', key: 't', cmd: 'takeoff' },
    { label: 'Left', key: 'a', cmd: `left ${droneState.hDist}` },
    { label: 'Backward', key: 's', cmd: `back ${droneState.hDist}` },
    { label: 'Right', key: 'd', cmd: `right ${droneState.hDist}` },
    { label: 'Descend', key: 'f', cmd: `down ${droneState.vDist}` },
    { label: 'Land', key: 'g', cmd: 'land' },
    { label: '🛑 EMERGENCY STOP 🛑', key: ' ', cmd: 'emergency' },
  ];

  // setup listeners for the keyboard
  useEffect(() => {
    const keyDownHandler = (e) => {
      console.log(`"${e.key}"`);
      handlePress(e.key);
    };
    const keyUpHandler = (e) => {
      handleRelease(e.key);
    };

    // setup keyboard listeners
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      // remove event listeners on component unmount
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const handlePress = (key, ref) => {
    const command = actions.find((control) => control.key === key);
    console.log(command);
    if (command && droneState.socket) {
      // if the command exists && drone exists send the command!
      sendCommand('PASSTHROUGH', command.cmd);
    }
  };

  const handleRelease = (key, ref) => {};

  return (
    <section className="controller-wrapper">
      <h4>Controller {!droneState.socket ? '(disconnected)' : ''}</h4>
      <div className="controller">
        {actions.map((control) => {
          return (
            <ControllerButton
              label={control.label}
              key={control.key}
              keyChar={control.key}
              press={() => {
                handlePress(control.key);
              }}
              release={() => {
                handleRelease(control.key);
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Controller;
