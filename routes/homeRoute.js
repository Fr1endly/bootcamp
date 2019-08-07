import express from 'express';
import indexAction from '../controllers/homeController';

const router = express.Router();

router.get('/', indexAction);

export default router;
