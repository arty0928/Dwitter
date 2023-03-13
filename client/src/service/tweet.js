export default class TweetService {

  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    console.log(this);
    console.log(this.http);
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    });
  }

//fetch에서 에러가 나면 에러를 던지니까 에러를 reject하는 promise가 됨
  async postTweet(text) {
    console.log('post tweet client');
    console.log(this.http);

    return this.http.fetch(`/tweets`, {
      method: 'POST',
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
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }
}
