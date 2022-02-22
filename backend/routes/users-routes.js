const express           = require('express');
const router            = express.Router();
const userController    = require('../controllers/user-controllers');
const { check }         = require('express-validator');

router.get('/', userController.getUsers);
router.post('/login', [check('username').not().isEmpty(), 
check('password').not().isEmpty()],userController.login );

router.post('/register',
[check('username').not().isEmpty(), 
check('password').not().isEmpty()],
userController.register);

module.exports = router;