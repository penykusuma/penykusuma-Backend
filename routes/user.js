const express = require('express');
const routerUser = express.Router();
const ctrUser = require('../controller/user')

routerUser.post('/login', ctrUser.login)
routerUser.post('/register', ctrUser.register)
routerUser.post('/logout', ctrUser.logout)

module.exports = routerUser;