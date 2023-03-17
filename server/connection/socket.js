import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

class Socket{
    constructor(server){
        //이 Server는 socket.io에서 지원
        //1. server에서 socket을 만들고,
        this.io = new Server(server, {
            cors: {
                origin: '*',
            },
        });

        //token 확인 -> 사용자 확인
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if(!token){
                return next(new Error('Authentication error'));
            }
            jwt.verify(token, config.jwt.secretKey,(error, decoded)=>{
                if(error) {
                    return next(new Error('Authentication error'));
                }
                next();
            });
        });

          //server에서 socket을 켜고
        this.io.on('connection', (socket) => {
            console.log('Socket client connected');
        });
    }
}

let socket;
export function initSocket(server){
    //socket이 있는지 확인, 없으면 만들기
    if(!socket){
        socket = new Socket(server);
    }
}

export function getSocketIO(){
    if(!socket){
        throw new Error('Please call init first');
    }
    //socket이 있다면 가져오기
    //socket 클래스 안에 있는 io를 전달,
    //즉, constructor로 만든 this.io의 Server를 전달
    return socket.io;
}