export default class AuthService {

  constructor(http) {
    this.http = http;
  }

  async fetchlogin(username, password) {
    return {
      username: 'ellie',
      token: 'abc1234',
    };
  }

  async me() {
    return {
      username: 'ellie',
      token: 'abc1234',
    };
  }

  async logout() {
    return;
  }

  async signup(username, password, name, email, url) {
    console.log(`signup client`);
    console.log(this.http);

    return this.http.fetch(`/tweets` ,{
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
        token: 'abc1234',
      }),
    });
  }
}
