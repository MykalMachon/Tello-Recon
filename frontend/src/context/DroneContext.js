import { createContext, useMemo, useReducer } from 'react';

export const DroneContext = createContext({
  droneState: {
    socket: null,
    battery: 0,
    status: 'disconnected',
    video: null,
    log: null,
    position: {
      x: 0,
      y: 0,
      z: 0,
      speed: 0,
    },
  },
  dispatch: null,
});

const initState = {
  socket: null,
  battery: 0,
  status: 'disconnected',
  video: null,
  log: null,
  position: {
    x: 0,
    y: 0,
    z: 0,
    speed: 0,
  },
};

// this handles all actions that can be taken on the drone directly
// this doesn't include passthrough commands yet as they don't directly impact
// drone state? (we should probably re-evaluate this)
const droneReducer = (state, action) => {
  switch (action.type) {
    case 'TRY_CONNECTION':
      return {
        ...state,
        socket: action.payload.socket,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

// simple context provider that wraps the application
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
