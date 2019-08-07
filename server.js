import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import mysql from 'mysql';
import healthCheck from './routes/healthCheck';
import homeRoute from './routes/homeRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '1234',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
connection.connect();
connection.query('SELECT * FROM `user` WHERE `ID` = 1', (error, results, fields) => {
  if (error) {
    console.log(error);
  }
  console.log(results[0]);
});

console.log(process.env.USER_NAME);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use('/', homeRoute);

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log(
    'info',
    `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
  );
});

module.exports = app;
