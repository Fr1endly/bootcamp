import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('homeController');



const indexAction = async (req, res, next) => {
  logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
  try {
    res.status(200).send({
      code: 200,
      data: {
        message: 'Health is OK',
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

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

      if (error) {
        console.log(error)
      }

      if (results) {
        res.json(results[0])
      }
    }
  }
   catch (err) {
    next(new AppError(err.message, 400));
  }


export default indexAction;
