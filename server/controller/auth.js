import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

//TODO: MAKE SECURE
const jwtSecretKey = '1asdf234790sj2cow94n9dw39Q';
const jwtExpriresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
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
    //201: 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성
    res.status(201).json({token, username});
}

export async function login(req, res) {
    const {username, password} = req.body;
    const user = await userRepository.findByUsername(username);
    if(!user){
        //401: 미인증
        return res.status(401).json({ message: 'Invalid user or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return res.status(401).json({ message: 'Invalid user or password ' });
    }

    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

function createJwtToken(id){
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpriresInDays});
}