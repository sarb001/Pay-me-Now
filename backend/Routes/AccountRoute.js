import express  from 'express';
import { AllTransaction, RequestMoney, acceptmoney, addMoney, paymoney, rejectmoney  } from '../Controllers/AccountController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/requestmoney').post(authMiddleware,RequestMoney);

router.route('/transfer').post(authMiddleware,paymoney);

router.route('/alltransaction').get(authMiddleware,AllTransaction);

router.route('/addmoney').post(authMiddleware,addMoney);


router.route('/acceptmoney').post(authMiddleware,acceptmoney);

router.route('/rejectmoney').put(authMiddleware,rejectmoney);

export default router;