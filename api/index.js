const express = require('express');
const app = express();
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

// routes
const apiPrefix = './api/routes';
app.use('/api/auth', require(`${apiPrefix}/auth.js`));

app.listen(PORT, () =>
  console.log(`Server running in ${nodeEnv} on port ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandler rejection error: ${err.message}`.red);
});
