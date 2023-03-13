let users = [
    {
        id: '1',
        username: 'bob',
        password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
        name: 'bob',
        email: 'bob@gmail.com',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        token: ''
    }
];

export async function findByUsername(username){
    return users.find((user) => user.username === username);
}

export async function findById(id){
    return users.find((user) => user.id === id);
}

export async function createUser(user){
    const created = {...user, id: Date.now().toString() };
    users.push(created);
    console.log(users);
    return created.id; 
}