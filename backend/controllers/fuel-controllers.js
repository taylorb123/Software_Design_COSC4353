const HttpError = require('../models/http-error');

const DUMMY_QUOTE = [
    {
        gallons: '2',
        address1: '123 fake street',
        Address2: '456 evenFaker street',
        date: '02/20/2022',
        ppg: '2.00',
        total: '500',
        username: 'taylor'
    }
];

const getQuoteByUsername = (req,res,next) => {        //return json formatted DUMMY_QUOTE by username
    const quoteByUser = req.params.username;
    const quote = DUMMY_QUOTE.find(p => {
        return p.username === quoteByUser;
    });

    if(!quote){
        return next(new HttpError('Could not find quote for given username', 404));
    }

    console.log('GET Request in fuelquotes');
    res.json({quote});
};

const createQuote = (req,res,next) => {
    const {gallons,address1,Address2,date,ppg,total,username } = req.body;

    const createQuote = {
        gallons,
        address1,
        Address2,
        date,
        ppg,
        total,
        username
    };
    DUMMY_QUOTE.push(createQuote);
    res.status(201).json({place: createQuote});
};

exports.getQuoteByUsername = getQuoteByUsername;
exports.createQuote = createQuote;