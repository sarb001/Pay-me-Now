import express, { Router } from 'express';
import { balance } from '../Controllers/AccountController';

const router = express.Router();

router.route('/balance').post(balance);

export default router;