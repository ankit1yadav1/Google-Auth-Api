const express = require('express');

const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/users', isAuth, authController.getUsers);

router.post('/users', authController.loginUser);

router.post('/delete-user', isAuth, authController.deleteUser)

module.exports = router;
