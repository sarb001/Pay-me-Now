import express  from 'express';
import { AllTransaction, RequestMoney, transferMoney } from '../Controllers/AccountController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/transfer').post(authMiddleware,transferMoney);

router.route('/alltransaction').get(authMiddleware,AllTransaction);

router.route('/requestmoney').post(authMiddleware,RequestMoney);

export default router;