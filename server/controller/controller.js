import tweets from '../data/data.js';

export function GetAllTweets(username){
    const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
    return data;
}

export function GetMyTweets(userId){
    const tweet = tweets.find((tweet) => tweet.id === userId);
    // if (tweet) {d
    //         res.status(200).json(tweet);
    // } else {
    //         res.status(404).json({ message: `Tweet id(${userId}) not found` });
    // }
    return tweet;
}

