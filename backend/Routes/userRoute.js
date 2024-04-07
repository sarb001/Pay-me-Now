import express from 'express';
import { AllUsers, LoginUser, Profile, SignupUser, UpdateProfile } from '../Controllers/UserController.js';
import { authMiddleware } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.route('/signup').post(SignupUser);

router.route('/login').post(LoginUser);

router.route('/profile').get(authMiddleware,Profile);

router.route('/updateprofile').put(authMiddleware,UpdateProfile);

router.route('/bulk').get(authMiddleware,AllUsers);

// router.route('/bulk').get(authMiddleware,QueryFilter);




export default router;