import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res){

    const username = req.query.username;
    //이거 자체가 promise 라서 전체에 await 
    const data = await( username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}


export async function getTweet(req, res) {
    const id = req.params.id;
    //await은 promise가 다 끝날때까지 기다렸다가 return 
    const tweet = await tweetRepository.getById(id);
    if (tweet) {
    res.status(200).json(tweet);
    } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function createTweet(req, res){
    console.log(`tweet controller create tweet in server `);
    const { text } = req.body;
    //isAuth에서 사용자의 auth가 맞으면 request에 사용자 정보 저장했잖아
    //그 req.userId를 가져와서 tweet을 만듦
    const tweet = await tweetRepository.create(text, req.userId);
    res.status(201).json(tweet);
    //controller에서 새로운 Tweet을 만들때마다 socket에게 'tweet' 카테고리안에 새로 만들 tweet을 넣어줌
    getSocketIO().emit('tweets', tweet);
}

export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403);
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
}

export async function removeTweet (req, res, next){
    const id = req.params.id;

    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403);
    }

    await tweetRepository.remove(id);
    res.sendStatus(204);
}