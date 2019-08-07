import mysql from 'mysql';
import AppError from '../errors/AppError';


const logger = require('../utils/logger')('UserController');

const indexAction = async (req, res, next) => {
  logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);

  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: '1234',
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
    connection.connect();
    connection.query('SELECT * FROM `user` WHERE `ID` = 1', (error, results, fields) => {
      return results;
    })
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default indexAction;
