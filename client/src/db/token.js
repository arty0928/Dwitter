const TOKEN = 'token';

export default class TokenStorage{
    saveToken(token){
        localStorage.setItem(TOKEN, token);
    }

    getToken(){
        return localStorage.getItem(TOKEN);
    }

    clearToken(){
        localStorage.clear(TOKEN);
    }
}

//-> 브라우저 스토리지에 저장하는 것은 안전하지 않음
