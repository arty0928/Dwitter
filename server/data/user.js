import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

let users = [
    {
        username: 'Ellie',
        password: '1234',
        name: 'Ellie',
        email: 'ellie@gmail.com',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        token: ''
    },

    {
        username: "black",
        password : "2222",
        name : "black",
        email : "black@gmail.com",
        url: "",
        token: ''
    }
];

export async function findUsername(username){
    return users.find((user) => user.username === username);
}

export async function signup(userdata){

    const user = {
        username: userdata.username,
        password: userdata.password,
        name:  userdata.name,
        email:  userdata.email,
        url:  userdata.url
    };
    
    bcrypt.genSalt(10,function(err,salt){
        if(err) return Error(err);

        // console.log(`salt: ${salt}`);

        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return Error(err);

            user.password = hash;
            // console.log(user.password);
        })
    })

    const token = jwt.sign({
        //payload는 담고싶은 중요한 정보
        id: user.id,
        isAdmin : true,
    },'secretKey');

    user.token = token;

    // console.log(`before users`);
    // console.log(users);

    users = [user, ...users];

    console.log(`after users`);
    console.log(users);
    return  user;
}

export async function comparePassword(user, plainPassword, cb){
    bcrypt.compare(plainPassword, user.password, function(err, isMatch){
        if(err) return cb(err);
            console.log(users);
            cb(null, isMatch);
    });
}

export async function findByToken(req, cb){
    let token = req.cookies.x_auth;
    console.log(token);
    console.log(users);

    // return users.find((user) => user.username === username);
    const result = users.find((user)=> user.token === token);
    console.log('result');
    console.log(result);

}