const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersController = require('../../controllers/users');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

module.exports = router;