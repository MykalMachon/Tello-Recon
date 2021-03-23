import useTello from '../../hooks/useTello';

const ControllerButton = ({ label, keyChar, press, release }) => {
  const { droneState } = useTello();

  const pressSwitch = () => {
    press();
  };

  const releaseSwitch = () => {
    release();
  };

  return (
    <button
      className={`controller-btn`}
      onMouseDown={pressSwitch}
      onMouseUp={releaseSwitch}
      disabled={
        !droneState.socket || (keyChar !== ' ' && droneState.status === 'busy')
      }
    >
      <span className="controller-btn__label">{label}</span>
      <span className="controller-btn__key">{keyChar}</span>
    </button>
  );
};

export default ControllerButton;
