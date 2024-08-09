const express = require('express');
const route = express.Router();
const adminController = require('../controller/adminController');

route.post('/add/admin', adminController.addadmin);

module.exports = route;