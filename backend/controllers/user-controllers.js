const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        username: 'Taylor',
        password: 'password'
    }
];


const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USERS});
};

const login = (req,res,next) => {
    const { username, password } = req.body;

    const registeredUser = DUMMY_USERS.find( u => u.username === username);
    if(!registeredUser || registeredUser.password !== password){
        //return next(new HttpError('Could not find given user', 401));
        throw new HttpError('Could not find user credentials', 401);
    }
    
    res.json({message: 'Logged in!'});
};

const register = (req,res,next) => {
    const { username, password } = req.body;

    const createdUser = {
        username,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
};


exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
