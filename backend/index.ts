import express from 'express';

// TODO setup PORT as an environment variable
const app = express();
const PORT = 8080;

// TODO setup UDP packet management and web sockets (socket.io) to allow for data streaming
app.get('/', (req, res) => {
  res.send({
    data: 'some data',
  });
});

app.listen(PORT, () => {
  console.log(`✨[backend]: Server is running at http://localhost:${PORT}`);
});
