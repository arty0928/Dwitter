//express 모듈 불러오기
const { response } = require('express');
const express = require("express");
//app : 새로운 express 앱을 만듬
//내부적으로 application이라는 객체를 생성하는데 거기에 post,get 등의 메소드가 있음
const app = express();
const port = 5000;
app.use(express.json());

const TweetSchema = [
    {
        id: "Luna",  // 트윗 아이디 String
        text: "Hello",  // 트윗 텍스트 String
        createdAt: Date, // 트윗 생성 날짜 Date
        name: "Luna",  // 사용자 이름  String
        username: "Luna",  // 사용자 닉네임 (아이디) String
        // url:   // 사용자 프로파일 사진 URL (optional) String
    }
]

//index.js가 존재하는 기본 디렉토리에 오면 hello world 출력
app.get("/", (req, res) => res.send("Hello World!~~ "));

app.get("/tweets",(req,res) => {

    res.status(200).json({
        TweetSchema
    })
});

app.get('/tweets?username=:username',(req,res)=>{
    res.status(200).json({
        TweetSchema
    })
})

app.get('/tweets/:id', (req,res) =>{
    res.status(200).json({
        TweetSchema
    });
});

//201: created new posts
app.post('/tweets',(req,res)=>{

    TweetSchema.push(req.body);

    res.status(201).json({
        TweetSchema
    });
});

app.put('/tweets/:id',(req,res)=>{

    const id = req.params.id;

    TweetSchema.find(element => element.id === id).text = req.body.text;

    res.status(200).json({
        TweetSchema
    });
});

//204: no content
app.delete('/tweets/:id', (req,res) => {
    const id = req.params.id;
    const findId = TweetSchema.find(c=> c.id == id);
    const index = TweetSchema.indexOf(findId);
    TweetSchema.splice(index,1); // parameter: (startIndex, delete 개수)

    console.log(TweetSchema);

    res.status(204).json({
        delSuccess: true
    });
});


//app.listen : 포트로 서버를 생성해주는 함수이다
app.listen(port, () => console.log(`Example app listening on port ${port}!`));