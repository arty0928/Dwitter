//express 모듈 불러오기
const express = require("express");
//app : 새로운 express 앱을 만듬
//내부적으로 application이라는 객체를 생성하는데 거기에 post,get 등의 메소드가 있음
const app = express();
const port = 5000;

//index.js가 존재하는 기본 디렉토리에 오면 hello world 출력
app.get("/", (req, res) => res.send("Hello World!~~ "));

//app.listen : 포트로 서버를 생성해주는 함수이다
app.listen(port, () => console.log(`Example app listening on port ${port}!`));