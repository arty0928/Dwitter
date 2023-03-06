
export default class AuthService {

  async login(username, password) {
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
    console.log(username);
    console.log(`signup client`);
    // console.log(this.http);

    return fetch(`http://localhost:3000/auth` ,{
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
