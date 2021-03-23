import useTello from '../../hooks/useTello';

const LogBook = () => {
  const { droneState } = useTello();

  const downloadLogsToFile = () => {
    const logJson = JSON.stringify(droneState.logs);

    const a = document.createElement('a');
    const logFile = new Blob([logJson], { type: 'text/json' });
    a.href = URL.createObjectURL(logFile);
    const date = new Date();
    a.download = `${date.getMonth()}-${date.getDate()} ${date.getHours()}-${date.getMinutes()} Tello Logs.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <section className="logbook">
      <header>
        <h4>Connection Logs</h4>
        <button
          onClick={downloadLogsToFile}
          disabled={droneState.logs.length === 0}
        >
          save logs
        </button>
      </header>

      <div className="logbook__logs">
        {droneState.logs.length > 0 ? (
          <>
            {droneState.logs.map((log) => {
              return (
                <p className="log" key={log.timestamp}>
                  <span>{log.timestamp}</span>: {log.contents}
                </p>
              );
            })}
          </>
        ) : (
          <p>No logs yet... try connecting to the drone!</p>
        )}
      </div>
    </section>
  );
};

export default LogBook;
