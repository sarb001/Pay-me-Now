import express from 'express';
import { LoginUser, SignupUser } from '../Controllers/UserController.js';

const router = express.Router();

router.route('/signup').post(SignupUser);

router.route('/login').post(LoginUser);


export default router;