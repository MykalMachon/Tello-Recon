import { createContext, useMemo, useReducer } from 'react';

export const DroneContext = createContext({
  droneState: {
    socket: null,
    battery: 0,
    status: 'disconnected',
    speed: 50,
    hDist: 100,
    vDist: 50,
    deg: 90,
    logs: [],
  },
  dispatch: null,
});

const initState = {
  socket: null,
  battery: 0,
  status: 'disconnected',
  speed: 50,
  hDist: 100,
  vDist: 50,
  deg: 90,
  logs: [],
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
    case 'TRY_DISCONNECT':
      return {
        ...state,
        socket: null,
        status: 'disconnected',
      };
    case 'STATUS_CHANGE':
      const newLogs = action.log ? [action.log, ...state.logs] : state.logs;
      return {
        ...state,
        ...action.payload,
        logs: newLogs,
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
