const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const ACCOUNT_INFORMATION = require('./fuel-controllers').ACCOUNT_INFORMATION
const DUMMY_USERS = [
    {
        username: 'Taylor123',
        password: 'password'
    }
];


const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USERS});
};

const login = (req,res,next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid input', 422);
    }

    const { username, password } = req.body;

    if (username.length < 8) {
        throw new HttpError("Username must be at least 8 characters.", 400)
      }

    const registeredUser = DUMMY_USERS.find( u => u.username === username);
    if(!registeredUser || registeredUser.password !== password){
        //return next(new HttpError('Could not find given user', 401));
        throw new HttpError('Could not find user credentials', 401);
    }
    
    res.json({message: 'Logged in!'});
};

const register = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid input', 422);
    }

    const { username, password } = req.body;

    if (username.length < 8) {
        throw new HttpError('Username must be at least 8 characters', 400)
    }

    const createdUser = {
        username,
        password
    };

    const createdAccount = {
        full_name: "",
        address1: "N/A",
        address2: "N/A",
        city: "",
        state: "",
        zip: "",
        username: username,
    }

    DUMMY_USERS.push(createdUser);
    ACCOUNT_INFORMATION.push(createdAccount)

    res.status(201).json({user: createdUser});
};


exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
