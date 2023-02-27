import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);
// router.get('/', tweetController.getTweets());
  //이렇게 함수 호출을 하면 함수 결과값이 return 됨 -> 호출말고 연결 

const validate = (req, res, next)=>{
  const errors = validationResult(req);
  if(errors.isEmpty()){
    return next();
  }
  return res.status(400).json({message: errors.array()});
}

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweeets
router.post('/',
[
  body('text').notEmpty().withMessage("text를 입력하세요"),
  body('username').notEmpty().withMessage("username를 입력하세요"),
  validate
],
tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id',tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id',
[
  body('id').notEmpty().withMessage("id 확인"),
],
tweetController.removeTweet);

export default router;
