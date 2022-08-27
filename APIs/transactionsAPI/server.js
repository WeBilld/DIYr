const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const transactionsRouter = require('./routes/transactions');

const app = express();
const PORT = 3003;

/*
1. app.use(express.json()) is used to parse JSON data sent by the client to the server.
2. app.use(express.urlencoded({ extended: true })) is used to parse the form data sent by the client to the server.
3. app.use(cookieParser()) is used to parse cookies sent by the client to the server.
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use('/transaction', transactionsRouter);

// Error Handling

app.use('*', (req, res) => res.status(404).send('Route not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in tools server' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () =>
  console.log(`Transaction server is listening on port ${PORT}...`)
);
