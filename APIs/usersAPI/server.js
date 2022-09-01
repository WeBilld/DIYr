/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const usersRouter = require('./routes/users');
const cors = require('cors');

const app = express();
const PORT = 3000;


/*
1. app.use(express.json()) is used to parse JSON data sent by the client to the server.
2. app.use(express.urlencoded({ extended: true })) is used to parse the form data sent by the client to the server.
3. app.use(cookieParser()) is used to parse cookies sent by the client to the server.
*/
app.use(cors({
  origin: ["http://localhost:8080", 'http://localhost:5500'],
 //update: or "origin: true," if you don't wanna add a specific one
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Add routers */
app.use('/users', usersRouter);

// /*
//  Only serve the index file if not in production. dev-server will handle serving it otherwise.
// */
// if (process.env.NODE_ENV === 'production') {
//   // serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
//   });
// }

// app.get('*', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));
app.use('*', (req, res) => res.status(404).send('Route not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in users server' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`users Server is listening to at port: ${PORT}`));
