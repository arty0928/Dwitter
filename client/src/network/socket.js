import socket from 'socket.io-client';

export default class Socket{
    constructor(baseURL, getAccessToken){
        this.io = socket(baseURL, {
            //보안위험: auth로 사용해야 함
            auth: (cb) => cb({token: getAccessToken()}),
        });

        this.io.on('connect_error', (err) => {
            console.log('socket error', err.message);
        });
    }

    //event: 무엇을 듣고 싶은지
    onSync(event, callback){
        if(!this.io.connected){
            this.io.connect();
        }

        this.io.on(event, (message) => callback(message));
        //이 io에 대해서 해당 event를 더 이상 듣지 않도록 끔
        return () => this.io.off(event);
    }
}