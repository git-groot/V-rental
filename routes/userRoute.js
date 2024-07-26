
const express = require('express');
const userModule = require('../modules/userModule');
const userControl = require('../controller/userController')
const route = express.Router();


route.post('/addUser', userControl.adduser);

route.get('/getall',userControl.getallUser);

route.get('/user/:id',userControl.getsingle);

route.post('/user/login',userControl.loginUser);

module.exports = route;

