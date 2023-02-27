export default class HttpClient{
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetch(url, options){
        //네트워크 요청을 하고
        const res = await fetch(`${this.baseURL}${url}`,{
            ...options,
            headers:{
                'Content-Type': 'application/json',
                ...options.headers,
            }
        });

        //응답이 오면
        //body가 있는지 없는지 확인
        let data;
        try {
            //body가 있다면 json으로 추출해서 
            data = await res.json();
        }catch(error){
            console.error(error);
        }

        //fetch는 에러가 나도 return 하므로 return 전에 
        //200대가 아니면 에러처리
        if(res.status > 299 || res.status < 200){
            const message = data && data.message ? data.message : 'Something went wrong!😂 ';
            throw new Error(message);
        }

        //성공했다면 데이터 리턴
        return data;
    }
}