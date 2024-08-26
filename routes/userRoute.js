// userRoute.js
const express = require('express');
const userModule = require('../modules/userModule');
const userControl = require('../controller/userController')
const route = express.Router();


route.post('/addUser', userControl.adduser);

route.get('/getall',userControl.getallUser);

route.get('/user/:id',userControl.getsingle);

route.post('/user/login',userControl.loginUser);

route.put('/update/:id',userControl.updateUser);

route.delete('/delete/:id',userControl.deleteUser);


module.exports = route;

