import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined){
    //process.env에 값이 있는지 확인하고, 없다면 defaultValue로 설정
    const value = process.env[key] || defaultValue;

    //value가 없거나 undefined면
    if(value==null){ //null이거나 undefined일때 모두 true
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt:{
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt:{
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS',12)),
    },
    host : {
        port: parseInt(required('HOST_PORT',8080)),
    }
};