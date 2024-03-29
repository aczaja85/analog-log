import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import apiRouter from './routes/api';
const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//  * define route handlers
//  */
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '../dist/')));
// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send('This is not the page you are looking for...')
);

//global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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

//module.exports = app;
export default app;
