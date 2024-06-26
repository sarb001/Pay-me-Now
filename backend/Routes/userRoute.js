import express from 'express';
import { AllUsers, LoginUser, Logout, Profile, SignupUser, UpdateProfile } from '../Controllers/UserController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/signup').post(SignupUser);

router.route('/login').post(LoginUser);

router.route('/logout').post(Logout);

router.route('/profile').get(authMiddleware,Profile);

router.route('/updateprofile').put(authMiddleware,UpdateProfile);

router.route('/bulk').get(authMiddleware,AllUsers);





export default router;