import { useEffect } from 'react';
import useTello from '../../hooks/useTello';
import ControllerButton from './ControllerButton';

const Controller = () => {
  const { droneState, sendCommand } = useTello();

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

  useEffect(() => {
    // setup keyboard listeners
    document.addEventListener('keydown', (e) => {
      handlePress(e.key);
    });
    document.addEventListener('keyup', (e) => {
      handleRelease(e.key);
    });
  }, []);

  const handlePress = (key, ref) => {
    const command = actions.find((control) => control.key === key);
    if (command && droneState.socket) {
      // if the command exists, send it!
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
