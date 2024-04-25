import express  from 'express';
import { AllTransaction, RequestMoney, paymoney  } from '../Controllers/AccountController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/requestmoney').post(authMiddleware,RequestMoney);

router.route('/transfer').post(authMiddleware,paymoney);

router.route('/alltransaction').get(authMiddleware,AllTransaction);


export default router;