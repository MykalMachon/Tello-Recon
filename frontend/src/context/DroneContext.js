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

const droneReducer = (state, action) => {
  switch (action.type) {
    case 'TRY_CONNECTION':
      console.log('attempt connecting');
      return {
        ...state,
        socket: action.payload.socket,
        status: action.payload.status,
      };
    default:
      return state;
  }
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
