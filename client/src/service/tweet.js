export default class TweetService {

  constructor(http,tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

//fetch에서 에러가 나면 에러를 던지니까 에러를 reject하는 promise가 됨
  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ 
        text, 
        username: 'ellie', 
        name: 'Ellie' 
      }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }
    getHeaders(){
      //tokenStorage에서 token을 받아온 후,
      const token = this.tokenStorage.getToken();
      //return으로 token을 가지고 있는 Authorization을 넘겨줌 -> getHeaders를 호출하면 이 Authorization을 header에 추가하게 됨
      return{
        Authorization: `Bearer ${token}`,
      };
  }
}
