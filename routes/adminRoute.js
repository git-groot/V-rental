const express = require('express');
const route = express.Router();
const adminController = require('../controller/adminController');

route.post('/add/admin', adminController.addadmin);

route.get('/getall',adminController.getadmin);

route.get('/getsingle/:id',adminController.getadminById);

route.delete('/delete',adminController.deleteadmin);

route.put('/update/:id',adminController.updateadmin);

route.post('/login',adminController.adminlogin);

module.exports = route;