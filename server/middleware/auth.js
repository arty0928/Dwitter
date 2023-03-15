import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) =>{

    //req Header에 있던 Authorization 이라는 key를 가져오기
    const authHeader = req.cookies.Authorization;
    // const authHeader = req.get('next-auth.session-token');
    // console.log(req);
    // const authHeader = req.cookies.Authorization;
    console.log("authHeader");
    console.log(authHeader);

    //authHeader가 존재하지 않거나, authHeader가 Bearer로 시작하지 않으면 
    if(!(authHeader && authHeader.startsWith('Bearer'))){
        return res.status(401).json(AUTH_ERROR);
    }

    //Bearer 다음에 오는 token을 가져와야 하므로 공백 기준 나누고 가져오기
    const token = authHeader.split(' ')[1];

    //TODO: Make It Secure
    //verify: token 유효성 판단
    jwt.verify(
        token,
        'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z',

        //verify: token 유효성 판단
        async(error, decoded) =>{
            if(error){
                return res.status(401).json(AUTH_ERROR);
            }

            //사용자가 있는지 다시 찾기
            const user = await userRepository.findById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }

            //사용자가 유효하다면 사용자의 id를 requset에 저장
            req.userId = user.id;   //req.customData
            next();
        }
    );
};