const express           = require('express');
const fuelControllers   = require('../controllers/fuel-controllers');
const router            = express.Router();
const { check }         = require('express-validator');



router.get('/:username', fuelControllers.getQuotesByUsername);
router.post('/', check('username').not().isEmpty() , fuelControllers.createQuote);                                  //create a new quote
router.patch('/:username', fuelControllers.updateQuote);                        //update an exsisting quote by username
router.delete('/:username', fuelControllers.deleteQuote);                       //detele an exsisting quote by username
router.get('/:username/account', fuelControllers.getAccountByUsername);         //retrieve account_information
router.patch('/:username/accounts',
[check('full_name').not().isEmpty(), 
check('address1').not().isEmpty()] 
,fuelControllers.updateAccountInformation);   //update account_information
module.exports = router;