import express  from 'express';
import { AllTransaction, balance, transferMoney } from '../Controllers/AccountController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/balance').get(authMiddleware,balance);

router.route('/transfer').post(authMiddleware,transferMoney);

router.route('/alltransaction').get(authMiddleware,AllTransaction);

export default router;