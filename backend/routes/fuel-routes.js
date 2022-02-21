const express           = require('express');
const fuelControllers   = require('../controllers/fuel-controllers');
const router            = express.Router();



router.get('/:username', fuelControllers.getQuotesByUsername);
router.post('/', fuelControllers.createQuote);                      //create a new quote
router.patch('/:username', fuelControllers.updateQuote);            //update an exsisting quote by username
router.delete('/:username', fuelControllers.deleteQuote);
router.get('/:username/account', fuelControllers.getAccountByUsername);
router.patch('/:username/account', fuelControllers.updateAccountInformation);           //detele an exsisting quote by username
module.exports = router;