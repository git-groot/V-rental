const bookControle = require('../controller/bookingController');
const express = require('express');
const route = express.Router();

route.post('/add/booking',bookControle.addbook);



module.exports=route;
