//(Tip!!)데이터베이스를 사용할때 data 폴더 안의 tweet.js만 수정하면 됨

let tweets = [
    {
      id: '1',
      text: '드림코더분들 화이팅!',
      createdAt: Date.now().toString(),
      name: 'Bob',
      username: 'bob',
      url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
      id: '2',
      text: '안뇽!',
      createdAt: Date.now().toString(),
      name: 'Ellie',
      username: 'ellie',
    },
  ];


//DB에서 가져오는 거기 때문에 비동기 async로 
//그냥 return 하더라도 async가 붙으면 promise 형태가 됨
export async function getAll(){
    return tweets;
}

export async function getAllByUsername(username){
  return tweets.filter((tweet) => tweet.username === username )
}

export async function getById(id){
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username){
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function update(id, text){
  const tweet = tweets.find((tweet) => tweet.id === id);
  if(tweet){
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id){
  tweets = tweets.filter((tweet) => tweet.id !== id);
}


