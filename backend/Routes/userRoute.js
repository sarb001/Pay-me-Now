import express from 'express';
import { LoginUser, Profile, SignupUser } from '../Controllers/UserController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/signup').post(SignupUser);

router.route('/login').post(LoginUser);

router.route('/profile').get(authMiddleware,Profile);


export default router;