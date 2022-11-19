const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./db/index.js');
require('dotenv').config();
const nodeEnv = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;

// init
connectDb();

// middleware
app.use(express.json());
app.use(cors());

// logger
if (nodeEnv === 'development') {
  app.use(morgan('dev'));
}

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// routes
const apiPrefix = './api/routes';
app.use('/api/auth', require(`${apiPrefix}/auth.js`));
app.use('/api/pills', require(`${apiPrefix}/pills.js`));
app.use('/api/aws', require(`${apiPrefix}/aws.js`));

server.listen(PORT, () =>
  console.log(`Server running in ${nodeEnv} on port ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandler rejection error: ${err.message}`.red);
});
