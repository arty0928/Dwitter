import * as userRepository from '../data/user.js';

export async function signup(req, res) {
    //username, password, name, email, url
    const checkUser = await userRepository.findUsername(req.body);

    //checkUser = undefined 면 
    //즉, username 이 중복이 아니면
    if(checkUser){
        res.status(404).json({
            signupSuccess: false,
            message: "username 중복"
        })
    }
    else{
        const user = await userRepository.signup(req.body);

        if(!user) res.status(404).json({
            signupSuccess: false
        })
        else{
            res.status(200).json({
                signupSuccess: true,
                token: user.token,
                username: user.username
            })
        }
    }
}

export async function login(req, res) {
    //request: username, password
    console.log('login req');
    console.log(req.body);

    
    //일치하는 username이 있는지 확인
    const user = await userRepository.findUsername(req.body.username);
        //비밀번호 비교

    if(user){
        const comparePassword = await userRepository.comparePassword(user, req.body.password);
        if(comparePassword){
            res.status(404).json({
                loginSuccess: true,
                username: user.username,
                token: user.token
            })
        }else{
            res.status(404).json({
                loginSuccess: false,
                message: "비밀번호 틀림"
            })
        }
        
    }
    else{
        res.status(404).json({
            loginSuccess: false,
            message: "username 없음"
        })
    }
    //response: token, username
}

export async function me(req, res){

}