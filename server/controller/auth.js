import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

//TODO: MAKE SECURE
const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const jwtExpriresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
    console.log('server sign up');
    const {username, password, name, email, url} = req.body; //req.body에서 우리가 원하는 데이터를 다 가져오기
    const found = await userRepository.findByUsername(username);
    if(found){
        //409: 클라이언트의 요청과 서버의 상태 충돌
        return res.status(409).json({ message: `${username} already exists` });
    }

    //비밀번호를 암호화해서 저장
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    // res.status(201).json({token, username});
    res.cookie("Authorization",token)
        .status(200)
        .json({
            token,
            username
        }) 
}

export async function login(req, res) {
    console.log("server login 함수 들어옴");
    const {username, password} = req.body;
    console.log(username, password);
    const user = await userRepository.findByUsername(username);
    console.log(user);
    if(!user){
        //401: 미인증
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    console.log("login - 일치하는 user 정보 찾음");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return res.status(401).json({ message: 'Invalid user or password ' });
    }

    console.log("login - 비밀번호 일치");
    const token = createJwtToken(user.id);
    // res.status(200).json({token, username});
    // console.log("login token");
    // console.log(token);
    res.cookie("Authorization",token)
        .status(200)
        .json({
            token: token,
            username: username
        }) 
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpriresInDays});
}

export async function me(req,res,next) {
    console.log("auth me req");
    console.log(req);
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    //token은 userID만 넣어서 만듦 ->isAuth에서 이미 확인했지만 여기서 한번더 확인 -> user 정보를 가져오기 위해 
    res.status(200).json({token: req.token, username: user.username});
}