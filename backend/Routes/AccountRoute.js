import express  from 'express';
import { balance } from '../Controllers/AccountController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/balance').get(authMiddleware,balance);

export default router;