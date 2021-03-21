import { useEffect } from 'react';
import useTello from '../../hooks/useTello';
import ControllerButton from './ControllerButton';

const Controller = () => {
  const { droneState, sendCommand } = useTello();

  // list of all actions the controller can issue to the drone
  // is used to create and map buttons
  // TODO add pivot commands
  // TODO add up / down commands
  const actions = [
    { label: 'Pivot Left', key: 'q', cmd: '' },
    { label: 'Forward', key: 'w', cmd: 'forward 100' },
    { label: 'Pivot Right', key: 'e', cmd: '' },
    { label: 'Takeoff', key: 'r', cmd: 'takeoff' },
    { label: 'Left', key: 'a', cmd: 'left 100' },
    { label: 'Backward', key: 's', cmd: 'back 100' },
    { label: 'Right', key: 'd', cmd: 'right 100' },
    { label: 'Land', key: 'f', cmd: 'land' },
  ];

  // setup listeners for the keyboard
  useEffect(() => {
    const keyDownHandler = (e) => {
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
    console.log(`handling press ${key}`);
    const command = actions.find((control) => control.key === key);
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
