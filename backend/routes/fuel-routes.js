const express           = require('express');
const fuelControllers   = require('../controllers/fuel-controllers');
const router            = express.Router();



router.get('/:username', fuelControllers.getQuoteByUsername);
router.post('/', fuelControllers.createQuote);

module.exports = router;