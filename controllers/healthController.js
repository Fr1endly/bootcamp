import AppError from '../errors/AppError';

const logger = require('../utils/logger')('UserController');

const healthCheck = async (req, res, next) => {
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

export default healthCheck;
