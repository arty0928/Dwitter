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
    const { text, name, username } = req.body;
    const tweet = await tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if (tweet) {
    res.status(200).json(tweet);
    } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
}

export async function removeTweet (req, res, next){
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}