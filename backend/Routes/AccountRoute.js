import express  from 'express';
import { AllTransaction, RequestMoney, addMoney, paymoney  } from '../Controllers/AccountController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/requestmoney').post(authMiddleware,RequestMoney);

router.route('/transfer').post(authMiddleware,paymoney);

router.route('/alltransaction').get(authMiddleware,AllTransaction);

router.route('/addmoney').post(authMiddleware,addMoney);

export default router;