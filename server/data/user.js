import jwt from 'jsonwebtoken';
import bcryt from 'bcrypt';

let users = [
    {
        username: 'Ellie',
        password: '1234',
        name: 'Ellie',
        email: 'ellie@gmail.com',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
        username: "black",
        password : "2222",
        name : "black",
        email : "black@gmail.com",
        url: ""
    }
];

export async function findUsername(username){

    console.log(users);
    const user = users.find((user) => user.username === username);

    console.log(`find user`);
    console.log(user);
    return user;
}

export async function signup(userdata){

    const user = {
        username: userdata.username,
        password: userdata.password,
        name:  userdata.name,
        email:  userdata.email,
        url:  userdata.url
    };
    
    bcryt.genSalt(10,function(err,salt){
        if(err) return Error(err);

        console.log(`salt: ${salt}`);

        bcryt.hash(user.password, salt, function(err,hash){
            if(err) return Error(err);

            user.password = hash;
            console.log(user.password);
        })
    })

    const token = jwt.sign({
        //payload는 담고싶은 중요한 정보
        id: user.id,
        isAdmin : true,
    },'secretKey');

    user.token = token;
    
    console.log(`before users`);
    console.log(users);

    users = [user, ...users];

    console.log(`after users`);
    console.log(users);
    return  user;
}



export async function comparePassword(user, password){
    // users.comparePassword(password, (err, isMatch) =>{
    //     if()
    // })
    // return (user.password === password ? true : false);
}