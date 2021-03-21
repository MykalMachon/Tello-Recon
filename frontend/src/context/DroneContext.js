import { createContext, useMemo, useReducer } from 'react';

export const DroneContext = createContext({
  droneState: {
    socket: null,
    battery: 0,
    status: 'disconnected',
    video: null,
  },
  setDroneState: null,
});

const initState = {
  socket: null,
  battery: 0,
  status: 'disconnected',
  video: null,
};

const droneReducer = () => {
  // insert drone reducer
};

const DroneProvider = ({ children }) => {
  const [droneState, dispatch] = useReducer(droneReducer, initState);

  const contextValue = useMemo(() => {
    return { droneState, dispatch };
  }, [droneState, dispatch]);

  return (
    <DroneContext.Provider value={contextValue}>
      {children}
    </DroneContext.Provider>
  );
};

export default DroneProvider;
