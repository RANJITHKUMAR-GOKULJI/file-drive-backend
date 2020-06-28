const express = require('express');

const authRouter = express.Router();

var Auth = require('../controller/user.controller');

Auth = new Auth();

authRouter.post('/login',Auth.Login);
authRouter.post('/signup',Auth.Signup);

module.exports = authRouter;