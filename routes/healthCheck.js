import express from 'express';
import healthCheck from '../controllers/healthController';

const router = express.Router();

router.get('/health-check', healthCheck);

export default router;
