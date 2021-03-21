import { useState } from 'react';

const ControllerButton = ({ label, keyChar, press, release }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      className={`controller-btn ${active ? 'pressed' : ''}`}
      onMouseDown={() => {
        press();
        setActive(true);
      }}
      onMouseUp={() => {
        release();
        setActive(false);
      }}
    >
      <span className="controller-btn__label">{label}</span>
      <span className="controller-btn__key">{keyChar}</span>
    </button>
  );
};

export default ControllerButton;
