
const express = require('express');
const userModule = require('../modules/userModule');
const userControl = require('../controller/userController')
const route = express.Router();


route.post('/addUser', userControl.adduser);

route.get('/getall',userControl.getallUser)

module.exports = route;

