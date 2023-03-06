import * as userRepository from '../data/user.js';

import jwt from 'jsonwebtoken';
import bcryt from 'bcrypt';

export async function signup(req, res) {
    //username, password, name, email, url
    console.log(req.body);
    //이미 회원가입한 계정인지 이메일 비교,
    let user = {
        username: req.body.username,
        password: req.body.password,
        name:  req.body.name,
        email:  req.body.email,
        url:  req.body.url
    };
    //비밀번호 비크립트화해서 저장
    bcryt.genSalt(10,function(err,salt){
        if(err) return Error(err);

        console.log(`salt: ${salt}`);

        bcryt.hash(user.password, salt, function(err,hash){
            if(err) return Error(err);

            user.password = hash;
            console.log(user.password);
        })
    })

    //token 발행 후
    const token = jwt.sign({
        //payload는 담고싶은 중요한 정보
        id: user.id,
        isAdmin : true,
    },
        //secretKey (랜덤문자열)
        'secretKey'
    );

    console.log(`token: ${token}`);
    //response : token, username

    user.token = token;

    

    console.log(user);
    res.status(200).json({
        signupSuccess: true,
        token,
        username: user.username
    })
}

export async function login(req, res) {

}

export async function me(req, res){

}