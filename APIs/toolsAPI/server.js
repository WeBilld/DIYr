/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const toolsRouter = require('./routes/tools');

const app = express();
const PORT = 3001;


/*
1. app.use(express.json()) is used to parse JSON data sent by the client to the server.
2. app.use(express.urlencoded({ extended: true })) is used to parse the form data sent by the client to the server.
3. app.use(cookieParser()) is used to parse cookies sent by the client to the server.
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Add routers */
app.use('/tools', toolsRouter);

app.use('*', (req, res) => res.status(404).send('Route not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in tools server' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`tools Server is listening to at port: ${PORT}`));
