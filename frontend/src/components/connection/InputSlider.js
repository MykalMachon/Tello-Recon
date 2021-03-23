import { useEffect, useState } from 'react';
import useTello from '../../hooks/useTello';

const InputSlider = ({ label, defaultValue, id, min, max, units, cmd }) => {
  const { droneState, sendCommand } = useTello();

  const [value, setValue] = useState(defaultValue || min);
  const [tempVal, setTempVal] = useState(defaultValue || min);

  useEffect(() => {
    if (droneState.socket) {
      sendCommand('UPDATE_SETTINGS', `${cmd} ${value}`, id, value);
    }
  }, [value]);

  return (
    <label>
      {label}
      <input
        disabled={!droneState.socket}
        type="range"
        onChange={(e) => {
          setTempVal(e.currentTarget.value);
        }}
        onMouseUp={(e) => {
          console.log('mouse was removed');
          setValue(e.currentTarget.value);
        }}
        defaultValue={value}
        min={min}
        max={max}
        name={id || ''}
        id={id || ''}
      />
      {tempVal} {units || null}
    </label>
  );
};

export default InputSlider;
