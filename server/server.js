const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/api');
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

/**
 * Do I need to handle requests for static files?
 */
/**

 * define route handlers
 */
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send('This is not the page you are looking for...')
);

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;

//test from early set up, was above app.listen
// const sampleEntries = [
//     { artist: 'artistName', album: 'albumName', mood: 'happy', date: 'today' },
//     { artist: 'artistName2', album: 'albumName2', mood: 'sad', date: 'tomorrow' },
//   ];

//   app.get('/api/entries', (req, res) => {
//     console.log('hello from server.js');
//     res.status(200).json(sampleEntries);
//   });
