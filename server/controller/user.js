import * as userRepository from '../data/user.js';

export async function signup(req, res) {
    //username, password, name, email, url
    const user = req.query.name;
    console.log(user);
    //이미 회원가입한 계정인지 이메일 비교,


    //회원가입 가능한 메일이면

    //token 발행 후

    //response : token, username
}

export async function login(req, res) {

}

export async function me(req, res){

}