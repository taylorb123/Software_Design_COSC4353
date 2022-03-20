const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const ACCOUNT_INFORMATION = require('./fuel-controllers').ACCOUNT_INFORMATION
const User = require('../models/user');
const clientInformation = require('../models/clientInformation');

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

const register = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next (new HttpError('Invalid input', 422));
    }

    const { username, password } = req.body;

    if (username.length < 8) {
        return next ( new HttpError('Username must be at least 8 characters', 400));
    }

    let existingUser;
    try{
        existingUser = await User.findOne({username: username})
    }catch(err){
        const error = new HttpError(
            'Registration failed', 500
        );
        return next(error);
    }
    console.log(existingUser);
    if(existingUser){
        const error = new HttpError('User exsists already, please login again', 422);

        return next(error);
    }
    

    const createdUser = new User({
        username,
        password
    });
    
    const full_name = "N/A";
    const address1 = "N/A";
    const address2 = "N/A";
    const city = "N/A";
    const state = "N/A";
    const zip = "N/A";

    const createdAccount = new clientInformation({
        full_name,
        address1,
        address2,
        city,
        state,
        zip,
        username,
    });


    try{
        
        await createdUser.save();
        await createdAccount.save();
        
    } catch(err){
        const error = new HttpError('Creating a user failed', 
        500
        );
        console.log(err);
        return next(error);
    }
    //res.status(201).json({user: createdUser.toObject({getters: true})});


res.status(201).json({user: createdAccount.toObject({getters: true})});
    
};



exports.getUsers = getUsers;
exports.login = login;
exports.register = register;
