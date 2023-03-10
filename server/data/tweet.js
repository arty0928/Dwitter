//(Tip!!)데이터베이스를 사용할때 data 폴더 안의 tweet.js만 수정하면 됨

let tweets = [
    {
      id: '1',
      text: '드림코더분들 화이팅!',
      createdAt: new Date().toString(),
      userId: '1',
    },
    {
      id: '2',
      text: '안뇽!!',
      createdAt: new Date().toString(),
      userId: '1',
    },
  ];


//DB에서 가져오는 거기 때문에 비동기 async로 
//그냥 return 하더라도 async가 붙으면 promise 형태가 됨
export async function getAll(){

    //Promise로 빙글빙글 돌면서 findById로 tweet에 있는 사용자 정보를 받아오고,
    return Promise.all(
      tweets.map(async (tweet) => {
        const {username, name, url} = await userRepository.findById(
          tweet.userId
        );
        //트윗이랑 사용자의 정보를 함께 더해줌
        return { ...tweet, username, name, url };
      })
    );
}

export async function getAllByUsername(username){
  //getAll로 가져오는 것 중에 우리가 찾으려 하는 username과 동일하다면 동일한 아이템만 배열로 만들어 return 
  return getAll().then((tweets) => 
    tweets.filter((tweet) => tweet.username === username )  
  ); 
}

export async function getById(id){
  const found = tweets.find((tweet) => tweet.id === id);
  if(!found){
    return null;
  }

  //트윗을 한 userId와 동일한 user 정보를 가져와서 같이 return
  const {username, name, url} = await userRepository.findById(found.userId);
  return {...found, username, name, url};
}

export async function create(text, userId){
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];

  //getById로 사용자 정보를 찾아서 tweet과 같이 넘김
  return getById(tweet.id);
}

export async function update(id, text){
  const tweet = tweets.find((tweet) => tweet.id === id);
  if(tweet){
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id){
  tweets = tweets.filter((tweet) => tweet.id !== id);
}


