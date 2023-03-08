import * as userRepository from '../data/user.js';

export async function signup(req, res) {
    //username, password, name, email, url
    console.log(req.body);

    const user = await userRepository.bcryptPassword(req.body);

    if(!user) res.status(404).json({
        signupSuccess: false
    })

    res.status(200).json({
        signupSuccess: true,
        token: user.token,
        username: user.username
    })
}

export async function login(req, res) {

}

export async function me(req, res){

}