import { useEffect } from 'react';
import ControllerButton from './ControllerButton';

const Controller = () => {
  const actions = [
    { label: 'Pivot Left', key: 'q', cmd: '' },
    { label: 'Forward', key: 'w', cmd: '' },
    { label: 'Pivot Right', key: 'e', cmd: '' },
    { label: 'Left', key: 'a', cmd: '' },
    { label: 'Backward', key: 's', cmd: '' },
    { label: 'Right', key: 'd', cmd: '' },
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

  const handlePress = (key, ref) => {};

  const handleRelease = (key, ref) => {};

  return (
    <section className="controller-wrapper">
      <h4>Controller</h4>
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
