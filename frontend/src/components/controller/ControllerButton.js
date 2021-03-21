import { useState } from 'react';

const ControllerButton = ({ label, keyChar, press, release }) => {
  const [active, setActive] = useState(false);

  const pressSwitch = () => {
    press();
    setActive(true);
  };

  const releaseSwitch = () => {
    release();
    setActive(false);
  };

  return (
    <button
      className={`controller-btn ${active ? 'pressed' : ''}`}
      onMouseDown={pressSwitch}
      onMouseUp={releaseSwitch}
    >
      <span className="controller-btn__label">{label}</span>
      <span className="controller-btn__key">{keyChar}</span>
    </button>
  );
};

export default ControllerButton;
