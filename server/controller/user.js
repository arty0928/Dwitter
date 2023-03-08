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
    
    //일치하는 username이 있는지 확인
    const user = await userRepository.findUsername(req.body.username);
        //비밀번호 비교

    if(user){
        userRepository.comparePassword(user, req.body.password, (err, isMatch)=>{
            if(!isMatch){
                res.status(404).json({
                    loginSuccess: false,
                    message: "비밀번호 틀림"
                })
            }
            else{
                // res.status(404).json({
                //     loginSuccess: true,
                //     username: user.username,
                //     token: user.token
                // })
                res.cookie("x_auth",user.token)
                .status(200)
                .json({
                    loginSuccess: true, 
                    token: user.token,
                    username: user.username
                }) 
            }
        })       
    }
    else{
        res.status(404).json({
            loginSuccess: false,
            message: "username 없음"
        })
    }
}

export async function me(req, res){
    const auth = userRepository.findByToken(req);

    console.log('auth: ');
    console.log(auth);
    if(auth){
        res.status(200).json({
            authSuccess: true,
            token: req.body.token,
            username: req.body.username
        })
    }
}

// export async function getTweets(req, res){

//     const username = req.query.username;
//     //이거 자체가 promise 라서 전체에 await 
//     const data = await( username
//         ? tweetRepository.getAllByUsername(username)
//         : tweetRepository.getAll());
//     res.status(200).json(data);
// }