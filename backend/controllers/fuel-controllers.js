const HttpError = require('../models/http-error');

let DUMMY_QUOTE = [
    {
        gallons: '2',
        address1: '123 fake street',
        address2: '456 evenFaker street',
        date: '02/20/2022',
        ppg: '2.00',
        total: '500',
        username: 'taylor'
    }
];

let ACCOUNT_INFORMATION = [
    {
        full_name: 'taylor kyle',
        address1: '123 changed st.',
        address2: '456 moved dr.',
        city: 'Houston',
        state: 'TX',
        zip: '77379',
        username: 'taylor'
    }
];

const getAccountByUsername = (req,res,next) => {
    const accountInfo = req.params.username;
    const acc = ACCOUNT_INFORMATION.filter(p => {
        return p.username === accountInfo;
    });

    if(!acc){
        return next(new HttpError('Could not find account information for given username', 404));
    }

    console.log('Get Request in fuelquotes');
    res.json({acc});
};

const getQuotesByUsername = (req,res,next) => {        //return json formatted DUMMY_QUOTE by username
    const quoteByUser = req.params.username;
    const quotes = DUMMY_QUOTE.filter(p => {
        return p.username === quoteByUser;
    });

    if(!quotes || quotes.length === 0){
        return next(new HttpError('Could not find quotes for given username', 404));
    }

    console.log('GET Request in fuelquotes');
    res.json({quotes});
};

const createQuote = (req,res,next) => {
    const {gallons,address1,address2,date,ppg,total,username } = req.body;

    const createQuote = {
        gallons,
        address1,
        address2,
        date,
        ppg,
        total,
        username
    };
    DUMMY_QUOTE.push(createQuote);
    res.status(201).json({quote: createQuote});
};

const updateAccountInformation = (req,res,next) => {
    const{full_name,address1,address2,city,state,zip} = req.body;
    const userAccount = req.params.username;
    const updateAccountInformation = { ...ACCOUNT_INFORMATION.find(p => p.username === userAccount) };
    const formIndex = ACCOUNT_INFORMATION.findIndex(p => p.username === userAccount);
    updateAccountInformation.full_name = full_name;
    updateAccountInformation.address1 = address1;
    updateAccountInformation.address2 = address2;
    updateAccountInformation.city = city;
    updateAccountInformation.state = state;
    updateAccountInformation.zip = zip;

    ACCOUNT_INFORMATION[formIndex] = updateAccountInformation;
    res.status(200).json({updateAccountInformation});
};

const updateQuote = (req,res,next) => {
    const {gallons,address1,address2,date,ppg,total} = req.body;
    const userQuote = req.params.username;

    const updateQuote ={ ...DUMMY_QUOTE.find(p => p.username === userQuote) };
    const formIndex = DUMMY_QUOTE.findIndex(p => p.username == userQuote);
    updateQuote.gallons = gallons;
    updateQuote.address1 = address1;
    updateQuote.address2 = address2;
    updateQuote.date = date;
    updateQuote.ppg = ppg;
    updateQuote.total = total;

    DUMMY_QUOTE[formIndex] = updateQuote;
    res.status(200).json({quote: updateQuote});
};

const deleteQuote = (req,res,next) => {
    const userQuote = req.params.username;
    DUMMY_QUOTE = DUMMY_QUOTE.filter(p => p.username !== userQuote);
    res.status(200).json({message: 'Deleted Quote'});
};




exports.getQuotesByUsername = getQuotesByUsername;
exports.createQuote = createQuote;
exports.updateQuote = updateQuote;
exports.deleteQuote = deleteQuote;
exports.updateAccountInformation = updateAccountInformation;
exports.getAccountByUsername = getAccountByUsername;