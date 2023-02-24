import express from "express";
import 'express-async-errors';

let tweets = [
    {
    id: '1',
    text : '화이팅',
    createdAt : Date.now().toString(),
    name: 'Bob',
    username :'bob',
    url: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    } 
];
const router = express.Router();

//GET /tweets
//GET /tweets?usernmae=:username
router.get('/',(req,res,next)=>{
    
    //GET /tweets : undefined
    //GET /tweets?usernmae=:username : username
    const username = req.query.username;
    const data = username 
    ? tweets.filter((tweet) => tweet.username === username ) //해당하는 username이 있으면 필터링해서 보여주고
    : tweets;   //해당 username이 없으면 전체 트윗을 다 보여줌

    res.status(200).json(data);
})


//GET /tweets/:id
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    const tweet = tweets.find(tweet => tweet.id === id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id (${id} not found)`});
    }
})

//POST /tweets
router.post('/', (req,res,next)=>{
    const {text, name, username} = req.body; //req body 안에 있는 text, name, username을 받아온다
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets]; //데이터베이스 구축 전, tweets 객체에 앞에 추가한 tweet을 먼저 넣고, 그 다음 나머지
    res.status(201).json(tweet);
})


//PUT /tweets/:id
router.put('/:id',(req,res,next)=>{
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id (${id} not found)`});
    }
});

//DELETE /tweets /:id
router.delete('/:id',(req,res,next)=>{
    const id = req.params.id;
    tweets = tweets.filter(tweet => tweet.id !== id);
    res.sendStatus(204);
});

export default router;