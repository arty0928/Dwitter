import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import {body, param, validationResult} from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();

//validation
//sanitization + normalization => data coherence 

//나중에
  //Contract testing: Client - Server
  //Proto-base

const validateTweet = [
  body('text')
  .trim()
  .isLength({min: 3})
  .withMessage('text should be at least 3 characters'),
  validate
];

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);
// router.get('/', tweetController.getTweets());
  //이렇게 함수 호출을 하면 함수 결과값이 return 됨 -> 호출말고 연결 

// GET /tweets/:id
// validation : param은 잘못 전달하면 찾을수 없어서 에러남 -> id는 하지 않기
router.get('/:id', tweetController.getTweet);


// POST /tweeets
router.post('/', validateTweet, tweetController.createTweet);


// PUT /tweets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);


// DELETE /tweets/:id
router.delete('/:id',tweetController.removeTweet);


export default router;
