//express 모듈 불러오기
import express from "express";
import 'express-async-errors';
import cors from "cors";
import morgan from "morgan"; //debugging
import helmet from "helmet"; //보안
import tweetsRouter from './router/tweets.js';

//app : 새로운 express 앱을 만듬
//내부적으로 application이라는 객체를 생성하는데 거기에 post,get 등의 메소드가 있음
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

//index.js가 존재하는 기본 디렉토리에 오면 hello world 출력
app.get("/", (req, res) => res.send("Hello World!~~ "));

//모든 트윗에 대한 요청은 여기에 가도록
app.use('/tweets',tweetsRouter);

//(필수)not found
app.use((req,res,next)=>{
    //not found
    res.sendStatus(404);
});

//(필수)error 처리
app.use((req,res,next)=>{
    console.error(error);
    res.sendStatus(500);
});

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));