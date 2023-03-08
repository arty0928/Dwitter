import express from 'express';
import {} from 'express-async-errors';
import * as authController from '../controller/auth.js';
import {body} from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username should be at least 5 characters'),
    body('password')
        .trim()
        .isLength({min: 5})
        .withMessage('password should be at least 5 characters'),
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('nname is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url')
        .isURL() //url 형식이 맞는지 확인
        .withMessage('invalid URL')
        .optional({nullable: true, checkFalsy: true}), //url을 넣지 않아서 null이거나, 텅빈 문자열("", 0, false, null)을 넣어도 없는것으로 간주
    validate,
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

export default router;
