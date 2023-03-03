import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/user.js';
import {body, param, validationResult} from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// const validateTweet = [
//   body('text')
//   .trim()
//   .isLength({min: 3})
//   .withMessage('text should be at least 3 characters'),
//   validate
// ];

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/me', authController.me);

export default router;
